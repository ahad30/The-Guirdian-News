import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';



const RecommendationRequest = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/mySingleQuery/${user?.email}`, {
      withCredentials: true,
    })
      .then((data) => {
        setItems(data?.data);
        console.log(data?.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800'>Recommend Request</h2>
    
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <div className='flex items-center gap-x-3'>
                        <span>Date</span>
                      </div>
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <span>Product Name</span>
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      <button className='flex items-center gap-x-2'>
                        <span>Email</span>
                      </button>
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Title
                    </th>
                    <th scope='col' className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {items?.map(item => (
                    item.recommended.length === 0 ? (
    <tr key={item._id}>
      <td colSpan="5" className='px-4 py-4 font-bold text-center text-red-500 whitespace-nowrap'>
        No recommendations found.
      </td>
    </tr>  ) : (
                    item.recommended.map(recommendation => (
                      <tr key={recommendation?._id}>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {moment(recommendation.deadline).format('YYYY-MM-DD')}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {recommendation.recommendProductName}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {recommendation.userEmail}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {recommendation.title}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                        {recommendation.recommendReason}

                        </td>
                      </tr>
                    ))
  )
))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecommendationRequest;
