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

  const allArticle = useLoaderData();
  const { user } = useContext(AuthContext);
  const location = useLocation();
 const navigate = useNavigate();


  const {  image, deadline, publisher, tags, description, title, isPremium, status
  ,userName , userEmail} = allArticle

  // console.log(allArticle);


  return (
    <section className='lg:max-w-[1000px] w-[95 %] mx-auto space-y-5'>
     <>

      <div className=" px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <img className="object-cover w-full h-[350px] mb-4" src={image} alt="Product" />
        <div className="flex flex-col lg:flex-row items-center justify-between">
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" 
           >{title}</a>
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
          <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
            {publisher.label}</a>
        </div>

        <div className="mt-2">
         
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>

       
          <div className="flex items-center justify-end gap-2">
            <div>
              <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{userName}</a>
              <p className='text-sm'>{userEmail}</p>
            </div>
          </div>
      </div>
    </>    
    </section>
  )
}

export default AllArticlesDetails