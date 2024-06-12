import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { Button } from "antd";
import CountUp from 'react-countup';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0)

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];


    const { data: users = [], refetch } = useQuery({
        queryKey: ['adminUsers' , currentPage , itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adminUsers?page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })

    useEffect( () =>{
        axiosSecure.get(`/userPaginationCount`)
        .then(data => 
        {
          // console.log(data.data)
          setCount(data?.data?.count)
        })
    }, [])


    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
      }
      
      const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
      }
      
      const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
      }



    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-xl">All Users</h2>
                <h2 className="text-xl">Total Users: <CountUp end={users.length} /></h2>
            </div>
            <div className="overflow-x-auto w-[95%] max-w-6xl mx-auto py-2  md:px-6 lg:px-8">
            <div className="border border-gray-300  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300 ">
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className="px-5 text-center">{user.name}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">
                                    {user.role === 'admin' ? 'Admin' : <Button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="">
                                        <FaUsers className="text-black
                                        text-xl"></FaUsers>
                                    </Button>}
                                </td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
           </div>
            </div>
            <div className='pagination mt-5'>
                {/* <p>Current page: {currentPage}</p> */}
                <button className='bg-green-400 px-2 text-white rounded-lg disabled:cursor-not-allowed' onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
                {
                    pages.map(page => 
                    
                       (
                   
                        <button
                        className={currentPage === page ? 'bg-blue-600 px-2 text-white rounded-lg me-2' : undefined}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>
                    
                       )
                    )
                }
                <button className='bg-green-400 px-2 text-white rounded-lg disabled:cursor-not-allowed' onClick={handleNextPage} disabled={currentPage === pages.length - 1}>Next</button>

                <select className='bg-orange-500 rounded-lg text-white' value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">

                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllUsers;