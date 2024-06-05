import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();


const onSubmit = async(data) => {
  console.log(data)
  const imageFile = { image: data.image[0] }
  const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
          'content-type': 'multipart/form-data'
      }
  });
  if (res?.data?.success) {
    // now send the menu item data to the server with the image url
    const publisher = {
      publisherName: data?.publisherName,
       image: res.data?.data?.display_url,
     
      }
    // 
    const publisherRes = await axiosSecure.post('/addPublisher', publisher);
    console.log(publisherRes.data)
    if(publisherRes.data.insertedId){
        // show success popup
        reset();
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.publisherName} is added.`,
            showConfirmButton: false,
            timer: 1500
          });
    }
}
console.log( 'with image url', res.data);

}
  return (
    <section className="">
   
    <h2 className="text-2xl font-bold text-center mt-7">Add Publisher</h2>
    <div className=" p-10 rounded-lg shadow-lg mx-auto max-w-[700px] px-4 py-16 sm:px-6 lg:px-8">

      <form onSubmit={handleSubmit(onSubmit)} className="">
                
        <div className="">
       
  {/* Publisher */}
  <div className="form-control mb-8">
          <div>
    <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">Publisher Name</label>

    <input type="text" {...register("publisherName")} placeholder="Name" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
</div>
          </div>


          {/* Image URL */}
          <div className="form-control mb-8">
          <div>
    <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300">Image</label>

    <input {...register("image")} type="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600  dark:focus:border-blue-300" />
</div>
          </div>

        
          
          <div className="flex justify-center">
         <Button type="submit">Add Publisher</Button>
        </div>   
        </div>
      
       
      </form>

    </div>
  </section>
  )
}

export default AddPublisher