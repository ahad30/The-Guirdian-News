import { Button, Spinner } from "@material-tailwind/react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePublisher from "../../hooks/usePublisher";
import Select from 'react-select';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const options = [
  { value: 'Sport', label: 'Sport' },
  { value: 'Nation', label: 'Nation' },
  { value: 'Job', label: 'Job' }
]


const AddArticle = () => {
  const [loading , setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [publisher] = usePublisher();
  const [startDate, setStartDate] = useState(new Date(Date.now()))

  // console.log(startDate)
  const handleSelectChange = (selectedOption) => {
    setValue('tags', selectedOption);
    register('tags');
  
  };

  const handleSelectChange2 = (selectedOption2) => {
    setValue('publisher', selectedOption2);
    register('publisher');

  };


  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data)
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res?.data?.success) {

      const articleItem = {
        title: data?.title,
        tags: data?.tags,
        publisher: data?.publisher,
        description: data?.description,
        image: res.data?.data?.display_url,
        status: 'Pending',
        isPremium: 'No',
        deadline: startDate,
        userEmail: user?.email,
        userName: user?.displayName,
        photo: user?.photoURL,
      }
      // 
      const articleRes = await axiosSecure.post('/addArticle', articleItem);
      console.log(articleRes.data)
      if (articleRes.data.insertedId) {
        // show success popup
        reset()   
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.title} is added to the your article.`,
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(false)
      }
    }
    console.log('with image url', res.data);
  };

  return (

    <>
    { loading ? (<div className="flex justify-center items-center flex-col h-full p-24">
            <Spinner className="h-16 w-16 text-gray-900/50" />
              </div>) : (
    <section className="">
      <Helmet>
        <title>Guirdian | Add Article</title>
      </Helmet>
      <h2 className="text-2xl font-extrabold text-center mb-5">Add Article</h2>
      <div className="bg-[#F4F3F0] p-10 rounded-lg shadow-lg mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 gap-x-5 lg:grid-cols-2">

            {/* Image URL */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Image</span>
              </label>
              <input {...register("image")} type="file" required className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>

            {/* Title */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Title</span>
              </label>
              <input type="text" required {...register("title")} placeholder="Article Title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>

            {/* Tags */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Tag</span>
              </label>
              <Select onChange={handleSelectChange}
                defaultValue={null} 
                required
                options={options.map((item) => ({
                  value: item?.value,
                  label: item?.label
                }))} className=""
                placeholder="Select Tag" />
            </div>

            {/*Publisher */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Publisher</span>
              </label>
              <Select required
                onChange={handleSelectChange2}
                defaultValue={null}
                options={publisher.map((item) => ({
                  value: item?._id,
                  label: item?.publisherName
                }))}
                className=""
                placeholder="Select a Publisher"
              />
            </div>


            {/* Processing Time */}
            <div className='form-control mb-8'>
              <label className='label font-bold mb-3'>Date</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className='border p-2 rounded-md w-full'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            {/* Short Description */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Description</span>
              </label>
              <textarea required {...register("description")} placeholder="Short Description" className="textarea  rounded-lg border-gray-200 p-3 text-sm w-full"></textarea>
            </div>

          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Add Article</Button>
          </div>
        </form>

      </div>
    </section>
    )
    }
    </>
  );
};

export default AddArticle;
