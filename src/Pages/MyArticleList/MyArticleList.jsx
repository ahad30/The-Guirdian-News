
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { Button, Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FloatButton } from 'antd';
import RejectModal from '../../components/RejectModal/RejectModal';
import { useState } from 'react';


const MyArticleList = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [isOpen, setIsOpen] = useState(false);


  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myArticleList', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/myArticleList/${user?.email}`)
      return data
    },
  })
  // console.log(articles)
  if (isLoading) {
    return <div className="flex justify-center items-center flex-col h-full p-24">
    <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
  }


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



  return (
    <div className='mb-5'>  

      <h1 className='text-center text-3xl font-bold mt-5 mb-5'>My Articles</h1>
      <div className='flex flex-col mt-6'>
        <div className=''>
          <div className='w-[95%] max-w-6xl mx-auto py-2  md:px-6 lg:px-8'>
          {
                    articles?.length === 0 && 
                    <div>
                     <p className='flex justify-center text-red-400 font-bold'>No data found.</p>
                    </div>
                  }           
            <div className=' border overflow-x-auto border-gray-300  md:rounded-lg'>
              
              <table className='min-w-full divide-y divide-gray-200'>
                 
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col'
                      className='py-3.5 px-4 text-sm font-normal  text-gray-500'>
                      Serial
                    </th>
                    <th scope='col'
                      className='py-3.5 px-4 text-sm font-normal  text-gray-500'>
                       Article Photo
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
                        <span>Details</span>
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
                      <td className='flex justify-center'>
                         <img src={item?.image} alt="" className='h-[60px] w-[60px] rounded-full'/>
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500 text-center'>
                        {item?.title}
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        <Link><Button className='px-2 py-2 bg-green-400'>View Details</Button></Link>
                      </td>

               <td className= {`px-4 py-4 text-sm text-gray-500 whitespace-nowrap`}>
               <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            item?.isPremium === 'Yes' &&
                            'bg-yellow-100/60 text-yellow-500'
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

                      <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      <div
                          className={`flex justify-center items-center px-1 py-1 rounded-full gap-x-2 ${
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
                          <h2 className='text-sm font-normal'>{item?.status}</h2>
                        </div>
                         <div className='flex justify-center mt-2'>
                         {
                           item?.status === 'Rejected' &&
                          
                          <RejectModal 
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          item={item}
                          />
                          }
                         </div>
                      </td>
            
                      <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-3'>
                      <Link to={`/updateItem/${item?._id}`}>
                        <button>
                          <MdEdit />
                        </button>
                      </Link>
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
  );
};

export default MyArticleList;
