import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import { FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import ReasonRejectModal from '../../../components/ReasonRejectModal/ReasonRejectModal';
import Swal from 'sweetalert2';
import './Article.css'

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0)

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
console.log(pages)

  const { data: articles = [], refetch, isLoading } = useQuery({
    queryKey: ['articles', currentPage , itemsPerPage ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allAdminArticle?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  });
  //  console.log(articles)

  useEffect( () =>{
    axiosSecure.get(`/articlesPaginationCount`)
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

  

  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return title;
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/articleStatus/${id}`, { status });
      // console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success('Status Updated');
      refetch();
    },
  });

  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status);
    if (prevStatus === status) {
      return console.log('Error');
    }
    await mutateAsync({ id, status });
    setIsOpen(false);
  };


  const { mutateAsync: premiumStatus } = useMutation({
    mutationFn: async ({ id, isPremium }) => {
      const { data } = await axiosSecure.patch(`/articlePremium/${id}`,
         {isPremium});
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success('Premium Updated');
      refetch();
    },
  });


  const handlePremiumStatus = async (id, prevStatus, isPremium) => {
    console.log(id, prevStatus, isPremium);
    if (prevStatus === isPremium) {
      return console.log('Error');
    }
    await premiumStatus({ id, isPremium });
   
  };
 

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/deleteArticle/${_id}`, {
          method: 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire('Deleted!', 'Your Article has been deleted.', 'success');
              
            }
          });
      }
    });
  };


  if (isLoading) {
    return <div className='flex justify-center mt-10'><Spin /></div>;
  }

  return (
    <div className='mb-5'>
      <h1 className='text-center text-3xl font-bold mt-5 mb-5'>All Articles</h1>
      <div className='flex flex-col mt-6'>
        <div className=''>
          <div className='w-[95%] max-w-6xl mx-auto py-2  md:px-6 lg:px-8'>
            {articles?.length === 0 &&
              <div>
                <p className='flex justify-center text-red-400 font-bold'>No data found.</p>
              </div>
            }
            <div className='border overflow-x-auto border-gray-300  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal  text-gray-500'>Serial</th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal  text-gray-500'>Author</th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal  text-gray-500'>
                      <div className=''><span>Title</span></div>
                    </th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'><span>Email</span></div>
                    </th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'><span>Date</span></div>
                    </th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'><span>Publisher</span></div>
                    </th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'><span>Subscription</span></div>
                    </th>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'><span>isPremium</span></div>
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <span>Premium</span>
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Status
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Confirmation
                    </th>
                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>Actions</th>
                  </tr>
                </thead>

                <tbody className='bg-white divide-y divide-gray-300 '>
                  {articles.map((item, index) => (
                    <tr key={item?._id}>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-[12px]'>{item?.user?.name}</td>
                      <td className='px-4 py-4 text-sm text-gray-500 text-center'>{truncateTitle(item?.title)}</td>
                      <td className='text-sm px-4 text-gray-500  whitespace-nowrap'>{item?.user?.email}</td>
                      <td className='text-sm text-gray-500 px-4  whitespace-nowrap'>{moment(item?.deadline).format("MMM Do YY")}</td>
                      <td className='px-4 py-4 text-sm text-gray-500 text-center'>{item?.publisher.label}</td>
                      <td className='px-4 py-4 text-sm text-gray-500 text-center'>
                        {item?.user?.subscription === null ? 'Not yet' : "Yes"}
                      </td>
                      <td className= {`px-4 py-4 text-sm text-gray-500 whitespace-nowrap`}>
               <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            item?.isPremium === 'Yes' &&
                            'bg-yellow-100/60 text-green-500'
                          }   ${
                            item?.isPremium === 'No' &&
                            'bg-red-100/60 text-red-500'
                          } `}
                        >                      
                      <span
                            className={`h-1.5 w-1.5 rounded-full ${item?.isPremium === 'Yes' && 'bg-green-500'} ${
                              item?.isPremium === 'No' && 'bg-red-500'
                            } `}
                          ></span>
                      <h2> {item?.isPremium}</h2>
                    </div>
                      </td>

                      <td className={`px-4 py-4 text-sm text-gray-500 whitespace-nowrap`}>
                        <div>
                         <Button 
                          disabled={item?.isPremium === 'Yes'}
                          onClick={() => handlePremiumStatus(item?._id, item?.isPremium, 'Yes')}
                          className="px-2 text-[10px] py-2 disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">Make Premium
                            
                          </Button>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${item?.status === 'Pending' && 'bg-yellow-100/60 text-yellow-500'} ${item?.status === 'Approved' && 'bg-green-100/60 text-green-500'} ${item?.status === 'Rejected' && 'bg-red-100/60 text-red-500'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${item?.status === 'Pending' && 'bg-yellow-500'} ${item?.status === 'Approved' && 'bg-green-500'} ${item?.status === 'Rejected' && 'bg-red-500'}`}></span>
                          <h2 className='text-sm font-normal '>{item?.status}</h2>
                        </div>
                      </td>
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                        <div className='flex items-center gap-x-6'>
                          <button
                            onClick={() => handleStatus(item?._id, item?.status, 'Approved')}
                            disabled={item?.status === 'Approved' || item?.status === 'Rejected'}
                            className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='w-5 h-5'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                            </svg>
                          </button>
                        
                     
                          <button  disabled={item?.status === 'Approved' || item?.status ==='Rejected'} 
                          onClick={() => { setIsOpen(true); setSelectedItem(item); }} className='text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none disabled:cursor-not-allowed'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636' />
                            </svg>
                          </button>
                   
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
      {selectedItem && (
        <ReasonRejectModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={selectedItem}
          handleStatus={handleStatus}
        />
      )}
    </div>
  );
}

export default AllArticle;
