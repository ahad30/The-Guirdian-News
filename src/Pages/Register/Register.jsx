import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FiEyeOff } from "react-icons/fi";
import { AuthContext } from '../../Providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, logOut, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        // console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // console.log(name, photo, email, password);


        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or longer and a uppercase and lowercase');
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            toast.error('Your password should have at least one upper case characters.')
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.error('Your password should have at least one lower case characters.')
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                logOut()
                toast.success('Registered Successfully')
                navigate('/login')

                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            email:email,
                            name:name,
                            subscription : null,
                            isChange:false
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')

                                }
                            })
                    })
                    .catch()
            })
        // .catch(error => {
        //     console.error(error)
        //     toast.error('email already in use')
        // })

    }

    return (


        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <Helmet>
                <title>Guridian | Register</title>
            </Helmet>
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Register Now!</h1>

                <p className="mt-4 text-gray-500">
                    Various Luxury apartments are waiting for you
                </p>
            </div>

            <form onSubmit={handleRegister} className="mx-auto mb-0 mt-8 max-w-md space-y-4">

                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="form-control">
                        <input
                            type="text"
                            name='name'
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="form-control">
                        <input
                            type="email"
                            name='email'
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="sr-only">Photo Url</label>
                    <div className="form-control">
                        <input
                            type="text"
                            name='photo'
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Photo Url"
                        />
                    </div>
                </div>


                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="form-control relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            required
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                        />
                        {showPassword ? (
                            <FiEyeOff
                                size={35}
                                className="absolute inset-y-2 right-0 pr-4  cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaEye size={35}
                                className="absolute inset-y-2 right-0 pr-4  cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Already register?
                        <Link to="/login">
                            <button className="underline" href="#">Log in</button>
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Register