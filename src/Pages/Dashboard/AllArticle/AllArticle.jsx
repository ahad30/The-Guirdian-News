import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import { FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import ReasonRejectModal from '../../../components/ReasonRejectModal/ReasonRejectModal';




const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  // const [selectItem , setSelectItem] = useState({});
  
  // const handleModalEditInfo = (selectItem) => {
  //   setSelectItem(selectItem);

  // };

    const { data: articles = [], refetch, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allArticle');
            return res.data;
        }
    })
    // console.log(articles)

    const truncateTitle = (title) => {
      const words = title.split(' ');
      if (words.length > 3) {
        return words.slice(0, 3).join(' ') + '...';
      }
      return title;
    };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/articleStatus/${id}`, { status })
      console.log(data)
      return data
    },
    onSuccess: () => {
      // console.log('Wow, data updated')
      toast.success('Status Updated')
      refetch();
    },
  })

  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status)
    if (prevStatus === status) {
      return console.log('Error')
    }
    await mutateAsync({ id, status })
  }


if(isLoading){
  return <div className='flex justify-center'><Spin/></div>
}


  return (
    <div className='mb-5'>  
    <h1 className='text-center text-3xl font-bold mt-5 mb-5'>All Articles</h1>
    <div className='flex flex-col mt-6'>
      <div className=''>
        <div className='w-[95%] max-w-6xl mx-auto py-2  md:px-6 lg:px-8'>
        {
                  articles?.length === 0 && 
                  <div>
                   <p className='flex justify-center text-red-400 font-bold'>No data found.</p>
                  </div>
                }           
          <div className='border overflow-x-auto border-gray-300  md:rounded-lg'>
            
            <table className='min-w-full divide-y divide-gray-200'>
               
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col'
                    className='py-3.5 px-4 text-sm font-normal  text-gray-500'>
                    Serial
                  </th>
                  <th scope='col'
                    className='py-3.5 px-4 text-sm font-normal  text-gray-500'>
                     Author
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal  text-gray-500'
                  >
                    <div className=''>
                      <span>Title</span>
                    </div>
                  </th>

                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <div className='flex items-center gap-x-3'>
                      <span>Email</span>
                    </div>
                  </th>

                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <div className='flex items-center gap-x-3'>
                      <span>Date</span>
                    </div>
                  </th>

                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <div className='flex items-center gap-x-3'>
                      <span>Publisher</span>
                    </div>
                  </th>
                  <th
                    scope='col'
                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    <div className='flex items-center gap-x-3'>
                      <span>Subscription</span>
                    </div>
                  </th>

                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                      <span>Premium</span>
                    
                  </th>

                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                  >
                   Confirmation
                  </th>

                 

                  <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className='bg-white divide-y divide-gray-300 '>
            
                {articles.map((item,index) => (
                  <tr key={item?._id}>
                    <td className='text-center'>
                       {index+1}
                    </td>
                    <td className='text-[12px]'>
                      {item?.user?.name}
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500 text-center'>
                      {truncateTitle(item?.title)}
                    </td>
                  
                    <td className='text-sm px-4 text-gray-500  whitespace-nowrap'>
                    {item?.user?.email}
                    
                    </td>
                    <td className='text-sm text-gray-500 px-4  whitespace-nowrap'>
                    {moment(item?.deadline).format("MMM Do YY")}
                    
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500 text-center'>
                      {item?.publisher.label}
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500 text-center'>
                      {item?.user?.subscription === null ? 'Null' : "Yes" }
                    </td>

             <td className= {`px-4 py-4 text-sm text-gray-500 whitespace-nowrap`}>
             <div>
                  {item?.isPremium === 'Yes'? 'Yes' : <Button
                                        // onClick={() => handleMakeAdmin(user)}
                                        className="px-2 text-[10px] py-2">
                                       Make Premium
                                    </Button>}
                  </div>
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    <div
                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                          item?.status === 'Pending' &&
                          'bg-yellow-100/60 text-yellow-500'
                        }  ${
                          item?.status === 'Approved' &&
                          'bg-green-100/60 text-green-500'
                        } ${
                          item?.status === 'Rejected' &&
                          'bg-red-100/60 text-red-500'
                        } `}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item?.status === 'Pending' && 'bg-yellow-500'
                          } ${item?.status === 'Approved' && 'bg-green-500'} ${
                            item?.status === 'Rejected' && 'bg-red-500'
                          }  `}
                        ></span>
                        <h2 className='text-sm font-normal '>{item?.status}</h2>
                      </div>
                    </td>
                                 
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-6'>
                
                        <button
                          onClick={() =>
                            handleStatus(item?._id, item?.status, 'Approved')
                          }
                          disabled={item?.status === 'Approved' || item?.status ==='Rejected'}
                          className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m4.5 12.75 6 6 9-13.5'
                            />
                          </svg>
                        </button>
               
                        <ReasonRejectModal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          item={item}
                          handleStatus={handleStatus}
                                                         
                        >                      
                        </ReasonRejectModal>
                      </div>
                    </td>

                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                    <div className='flex items-center gap-x-3'>
                    <div>
                      <button onClick={() => handleDelete(item?._id)}>
                        <MdDelete />
                      </button>
                    </div>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default AllArticle