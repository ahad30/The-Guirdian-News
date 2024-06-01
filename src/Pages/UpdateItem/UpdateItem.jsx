import { Button } from '@material-tailwind/react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const UpdateItem = () => {
  const {user} = useContext(AuthContext)
  const loadedItems = useLoaderData();
  const navigate = useNavigate()
   const { _id , image,itemName,brandName,queryTitle, shortDescription,deadline} = loadedItems;
    const [startDate, setStartDate] = useState(new Date(deadline));
    
   console.log(loadedItems)



const handleUpdateItem = event => {
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
    const updateQueryItem = {
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
  //  console.log(newCraftItem);



    fetch(`${import.meta.env.VITE_API_URL}/updateQueryItem/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateQueryItem)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Query Item Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          navigate('/myQueryList')
        }

      });
  };





  return (
    <section className="">
    <Helmet>
      <title>Akeneo| Update Item</title>
    </Helmet>
    <h2 className="text-2xl font-extrabold text-center mb-5">Update Query Item</h2>
    <div className="bg-[#F4F3F0] p-10 rounded-lg shadow-lg mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

<form onSubmit={handleUpdateItem} className="">
  <div className="grid grid-cols-1 gap-x-5 lg:grid-cols-2">
    {/* Form fields */}
    {/* Image URL */}
    <div className="form-control mb-8">
      <label className="label">
        <span className="font-bold mb-3">Image URL</span>
      </label>
      <input type="text" required name="image" defaultValue={image} placeholder="Image URL" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
    </div>

    {/* Item Name */}
    <div className="form-control mb-8">
      <label className="label">
        <span className="font-bold mb-3">Product Name</span>
      </label>
      <input type="text" required name="itemName" defaultValue={itemName} placeholder="Item Name" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
    </div>
    {/* Brand Name */}
    <div className="form-control mb-8">
      <label className="label">
        <span className="font-bold mb-3">Brand Name</span>
      </label>
      <input type="text" defaultValue={brandName} required name="brandName" placeholder="Brand Name" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
    </div>
    {/*Query Title */}
    <div className="form-control mb-8">
      <label className="label">
        <span className="font-bold mb-3">Query Title</span>
      </label>
      <input type="text" required name="queryTitle" defaultValue={queryTitle} placeholder="title" className="input rounded-lg border-gray-200 p-3 text-sm w-full" />
    </div>


    {/* Date Time */}
    <div className='form-control mb-8'>
      <label className='label font-bold mb-3'>Date</label>
      <DatePicker
        
        className='border p-2 rounded-md  w-full'
        selected={startDate}
        
        onChange={date => setStartDate(date)}
      />
    </div>

    {/* Short Description */}
    <div className="form-control mb-8">
      <label className="label">
        <span className="font-bold mb-3">Boycott Reason</span>
      </label>
      <textarea name="shortDescription" required defaultValue={shortDescription} placeholder="Short Description" className="textarea  rounded-lg border-gray-200 p-3 text-sm w-full"></textarea>
    </div>

  </div>
  {/* Submit Button */}
  <div className="flex justify-end">
    <Button type="submit" value="Add Craft Item" className="" >Update Query</Button>
  </div>
</form>

</div>
  </section>
  )
}

export default UpdateItem