import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import { Button, Spinner } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AllArticlesDetails = () => {

  const allQuery = useLoaderData();
  const [startDate, setStartDate] = useState(new Date(Date.now()))
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
 const navigate = useNavigate();



  const { _id, image, deadline, itemName, brandName, shortDescription, queryTitle, posterInfo, recommended
  } = allQuery

  console.log(allQuery)


  return (
    <section className='max-w-[1250px] mx-auto space-y-5'>
    {
            loading ? (<div className="flex justify-center items-center flex-col h-full p-24">
            <Spinner className="h-16 w-16 text-gray-900/50" />
              </div>) : ( <>
    <div className='flex flex-col  lg:flex-row gap-4'>


      {/* Poster Details */}

      <div className="w-full lg:w-[50%]  px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <img className="object-cover w-full h-[350px] mb-4" src={image} alt="Product" />
        <div className="flex flex-col lg:flex-row items-center justify-between">

          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
          <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">{brandName}</a>
        </div>

        <div className="mt-2">
          <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{queryTitle}</a>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {shortDescription}
          </p>
        </div>

        <div className="flex  flex-col lg:flex-row items-center justify-between mt-4">
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabindex="0" role="link">{itemName}</a>

          <div className="flex items-center gap-2">
            <img src={posterInfo?.photo} alt="avatar" className='object-cover h-10 rounded-full' />
            <div>
              <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{posterInfo?.userName}</a>
              <p className='text-sm'>{posterInfo?.userEmail}</p>
            </div>
          </div>
        </div>
      </div>

</div>

    </>          )}
    </section>
  )
}

export default AllArticlesDetails