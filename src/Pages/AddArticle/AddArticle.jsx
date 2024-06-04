import { Button } from "@material-tailwind/react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddArticle = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date(Date.now()))
  const navigate = useNavigate()
  // console.log(startDate)

  const handleAddItem = event => {
    event.preventDefault();

    const form = event.target;
    const image = form.image.value;
    const itemName = form.itemName.value;
    const brandName = form.brandName.value;
    const queryTitle = form.queryTitle.value;
    const shortDescription = form.shortDescription.value;
    const deadline = startDate;
    const userEmail = user.email;
    const userName = user.displayName;
    const photo = user?.photoURL;
    
    const newQueryItem = {
      image,
      itemName,
      brandName,
      queryTitle,
      shortDescription,
      deadline,
      posterInfo: {
        userEmail,
        userName,
        photo
      },
      recommendation_count: 0,
    };
    //  console.log(newQueryItem);

    // send data to the server
    fetch(`${import.meta.env.VITE_API_URL}/addSingleQuery`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newQueryItem)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId.length > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Query  Added Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          form.reset();
          navigate('/myQueryList')

        }
      });
  };


  const onSubmit = async (data) => {
    console.log(data)
    // image upload to imgbb and then get an url v
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    if (res.data.success) {
        // now send the menu item data to the server with the image url
        const articleItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // 
        const menuRes = await axiosSecure.post('/addArticle', articleItem);
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    console.log( 'with image url', res.data);
};

  return (
    <section className="">
      <Helmet>
        <title>Akeneo | Add Item</title>
      </Helmet>
      <h2 className="text-2xl font-extrabold text-center mb-5">Add Query</h2>
      <div className="bg-[#F4F3F0] p-10 rounded-lg shadow-lg mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

        <form onSubmit={handleAddItem} className="">
          <div className="grid grid-cols-1 gap-x-5 lg:grid-cols-2">
            {/* Form fields */}
            {/* Image URL */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Image URL</span>
              </label>
              <input type="text" required name="image" placeholder="Image URL" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>

            {/* Item Name */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Product Name</span>
              </label>
              <input type="text" required name="itemName" placeholder="Item Name" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>
            {/* Brand Name */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Brand Name</span>
              </label>
              <input type="text" required name="brandName" placeholder="Brand Name" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
            </div>
            {/*Query Title */}
            <div className="form-control mb-8">
              <label className="label">
                <span className="font-bold mb-3">Query Title</span>
              </label>
              <input type="text" required name="queryTitle" placeholder="title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
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
                <span className="font-bold mb-3">Boycott Reason</span>
              </label>
              <textarea name="shortDescription" required placeholder="Short Description" className="textarea  rounded-lg border-gray-200 p-3 text-sm w-full"></textarea>
            </div>

          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" value="Add Craft Item" className="" >Add Query</Button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default AddArticle;
