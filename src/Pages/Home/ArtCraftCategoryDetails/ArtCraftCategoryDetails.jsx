
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { useEffect, useState } from 'react';

const ArtCraftCatgoryDetails = () => {
   
const artCraftExamples = useLoaderData()

return (
 <div className='w-[98%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
   {
    artCraftExamples?.examples?.map(example => (
    <div  className="overflow-hidden rounded-3xl shadow transition hover:shadow-lg">
    <div className=''>
    <img
        alt=""
        src={example?.image}
        className=" w-[400px] h-[314px] p-10 animate__animated animate__heartBeat"
      />
    
    </div>
      <div className="bg-white space-y-3 p-4 sm:p-6">
    
      <h1 className='font-medium'>{example?.itemName}</h1>
      <h1 className='font-bold'>#{artCraftExamples?.subcategoryName}</h1>
      <p>{example?.shortDescription}</p>
      <div className='flex items-center justify-between'>
     
      <p>$ <span className='text-[#23BE0A] font-bold'>{example?.price}</span> </p>
     <div className='flex items-center space-x-1'>
     <CiStar/>
      <p className='text-sm  p-1 text-black  me-2'>{example?.rating}</p>
     </div>
     <div className='flex items-center gap-1'>
            <Link to= {`/artCraftDetails/${example?._id}`}>
              <button className='text-sm bg-[#23BE0A] p-2 text-white rounded-md'>View Details</button>
            </Link>
            </div>   
      </div>
    
      </div>
     </div>


    ))
   }
</div>
);
}

export default ArtCraftCatgoryDetails;




