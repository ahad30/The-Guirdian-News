import { Helmet } from "react-helmet-async";
import toast  from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Spinner } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";


const UpdateProfile = () => {
const [loading, setLoading] = useState(false);
 const {user} = useAuth();
 const location = useLocation();
 const navigate = useNavigate();
// console.log(user)

 const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const photo = form.get('photo');
    const email = form.get('email');

    // if (name === user.displayName && photo === user.photoURL ) {
    //     toast.error('No changes detected in profile fields')
    //     return;
    // }
    setLoading(true);
    updateProfile(user, {
        displayName: name,
        photoURL: photo,
        email: email
    })
    .then(() => {
        toast.success('Profile updated successfully');
        setLoading(false)
        navigate(location?.state && location.state ); 
    })
    .catch((error) => {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
    });
};



    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <Helmet>
            <title>Guirdian | Update Profile</title>
        </Helmet>
        <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl mb-5">Profile Update!</h1>
        </div>

         <Card className="lg:w-[50%] mx-auto shadow-lg bg-blue-gray-50">  
        <form onSubmit={handleUpdate} className="p-8 mb-0 mt-8 space-y-10">

          {
            loading ? (<div className="flex justify-center items-center flex-col h-full p-24">
            <Spinner className="h-16 w-16 text-gray-900/50" />
              </div>) : 
            (<>
            
            <div>
                <div>
                <label htmlFor="name" className="font-bold">Name</label>
                <div className="form-control">
                    <input
                        type="text"
                        name='name'
                        defaultValue={user?.displayName}
                        required
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-3 mb-3"
                        placeholder="Enter name"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="font-bold">Email</label>

                <div className="form-control">
                    <input
                        type="email"
                        name='email'
                        readOnly
                        defaultValue={user?.email ? user.email : "email not found" }                      
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-3 mb-3"
                        placeholder="Enter email"
                    />
                </div>
            </div>


            <div>
                <label htmlFor="name" className="font-bold">Photo Url</label>
                <div className="form-control">
                    <input
                        type="text"
                        name='photo'
                        defaultValue={user?.photoURL}
                        required
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-3 mb-5"
                        placeholder="Photo Url"
                    />
                </div>
            </div>


            <div className="flex items-center justify-end">

                <button
                    type="submit"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                   Update
                </button>
            </div>
        </div>
            </>)
          } 

        </form>
        </Card>
        </div>
    );
};

export default UpdateProfile;