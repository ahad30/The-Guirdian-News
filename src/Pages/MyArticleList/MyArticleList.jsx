import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';

const MyArticleList = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_API_URL}/mySingleQuery/${user?.email}` , {
      withCredentials: true,
    })
      .then((data) => {
        setItems(data?.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user?.email]);

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
        fetch(`${import.meta.env.VITE_API_URL}/deleteQueryItem/${_id}`, {
          method: 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your Coffee has been deleted.', 'success');
              const remaining = items.filter((item) => item._id !== _id);
              setItems(remaining);
            }
          });
      }
    });
  };



  return (
    <div className='mb-5'>
      <section className="bg-gray-300 dark:bg-gray-900 w-[93%] mx-auto">
    <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
        <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
            Find your  <span className="text-blue-500">next product now.</span>
        </h2>

        <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
           
        </p>

        <div className="inline-flex w-full mt-6 sm:w-auto">
          <Link to={`/addQuery`}>
          <button className="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Add Query Now
            </button>
          </Link>
        </div>
    </div>
      </section>
<h1 className='text-center text-3xl font-bold mt-5 mb-5'>My Query Items</h1>


      { items.length === 0 ? (
        <p className='text-center text-red-400 font-bold'>No data found.</p>
      ) : (
        <div className='w-[98%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {items.map((item) => (
            <div key={item._id}>
              <div className='overflow-hidden rounded-3xl shadow transition hover:shadow-lg'>
                <div className=''>
                  <img
                    alt=''
                    src={item?.image}
                    className='w-[400px] h-[314px] p-10 animate__animated animate__heartBeat'
                  />
                </div>
                <div className='bg-white space-y-3 p-4 sm:p-6'>

                 <div className='flex justify-between items-center'>
                 <h1 className='font-bold text-lg'>{item?.itemName}</h1>
                 <div>
                 <Link to= {`/queryDetails/${item?._id}`}>
                    <button className='text-sm bg-[#23BE0A] p-2 text-white rounded-md'>View Details</button>
                 </Link>
                 </div>
                 </div>
                  <p>{moment(item?.deadline).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <h1 className='font-bold text-base'>{item?.queryTitle}</h1>
                  {/* <div className=''>
                  
                    <p className=' font-medium'>
                    {item?.shortDescription}
                    </p>                  
                    
                 
                  </div> */}
                  <div className='flex items-center justify-between gap-4 text-[#878787] mb-3'>
                    <div>
                      <p className='text-sm text-[#23BE0A]'>#{item?.brandName}</p>
                    </div>        
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArticleList;
