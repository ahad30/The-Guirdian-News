import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import { Button, Spinner } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AllRecommend from '../../AllRecommend/AllRecommend';


const AllQyeryDetails = () => {

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

  const handleAddRecommendation = async (event) => {
    event.preventDefault();

    // if(user?.email === posterInfo?.userEmail){
    //   return toast.error('Access Denied')
    // }

    const form = event.target;
    const queryId = _id
    const currentQueryTitle = queryTitle
    const currentProductName = itemName
    const recommendImage = form.recommendImage.value;
    const recommendProductName = form.recommendProductName.value;
    const title = form.title.value;
    const recommendReason = form.recommendReason.value;
    const deadline = startDate;
    const userEmail = user.email;
    const userName = user.displayName;
    const photo = user?.photoURL;

    const recommendationData = 
    {  queryId,
       currentQueryTitle ,
       currentProductName,
       recommendImage,
       recommendProductName,
       title,
       recommendReason,
       deadline,
       userEmail,
       userName,
       photo,
       posterInfo
      }
      setLoading(true);
  

    try {
      const { data } = await axiosSecure.put(`/addComment/${_id}`, recommendationData)
      console.log(data)
      console.log(recommendationData)
      toast.success('Comment added Successfully!')
      form.reset();
      setLoading(false)
      navigate(location?.state && location.state );

   
    } catch (err) {
      toast.error(err.response.data)
      // e.target.reset()
    }
  }


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


      {/* Recommendation Form */}

      <div className='w-full lg:w-[50%]'>
        <form onSubmit={handleAddRecommendation} className="">
          <div className="grid grid-cols-1 gap-x-5 lg:grid-cols-2">
            {/* Form fields */}

            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Email</span>
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                disabled
                defaultValue={user?.email}
                className='input rounded-lg border-gray-200 p-3 text-sm w-full'
              />
            </div>



            {/* Image URL */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Recommend Image URL</span>
              </label>
              <input type="text" required name="recommendImage" placeholder="Image URL" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>

            {/* Item Name */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Recommend Product Name</span>
              </label>
              <input type="text" required name="recommendProductName" placeholder="Product Name" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>
            {/* Brand Name */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Title</span>
              </label>
              <input type="text" required name="title" placeholder="Title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>

            {/*Query Title */}
            {/* <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Query Title</span>
              </label>
              <input type="text" required name="queryTitle" placeholder="title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div> */}

            {/* Date */}
            <div className='form-control mb-8'>
              <label className='label font-bold mb-3'>Date</label>

              <DatePicker
                className='border p-2 rounded-md w-full'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            {/* Short Description */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Recommendation Reason</span>
              </label>
              <textarea name="recommendReason" required placeholder="Description" className="textarea  rounded-lg border-gray-200 p-3 text-sm w-full"></textarea>
            </div>

          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" value="Add Craft Item" className="" >Add Recommend</Button>
          </div>
        </form>
      </div>

</div>

<div>
  <h1 className='text-center font-bold mb-5 text-lg'>Comment Section</h1>
  <AllRecommend recommended={recommended}></AllRecommend>
</div>
    </>          )}
    </section>
  )
}

export default AllQyeryDetails