import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { LuFileBadge2 } from 'react-icons/lu';
import moment from 'moment';
import { Link} from 'react-router-dom';

const PremiumArticle = () => {
  const [allArticles, setAllArticles] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {

    axiosPublic.get(`/allArticles`)
      .then(res => {
        // console.log(res.data)
        setAllArticles(res.data)
      })

     
  }, [ axiosPublic])
  const filteredArticles = allArticles.filter(article => article.isPremium === 'Yes');
  console.log(filteredArticles)
  return (
    <div className='max-w-6xl mx-auto'>   
     <h1 className='text-center font-bold text-xl mb-3'>All Premium Articles</h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
    {
      filteredArticles?.length === 0 && 
              <div>
               <p className='flex justify-center text-red-400 font-bold'>
               No data found.
               </p>
              </div>
            } 
      {
        filteredArticles.map(item =>
     
          <div className='' key={item?._id}>
            <div className= {`max-w-2xl overflow-hidden bg-amber-200 rounded-lg shadow-md dark:bg-gray-800 `}>
        
          <div className='relative'>
                <img className="object-cover w-full h-64" src={item?.image} alt="Product" />
                <div className='absolute left-[295px] bottom-[200px]'>
                  
                    <div><LuFileBadge2 size={40} className='text-red-400'></LuFileBadge2></div>
        
                </div>
              </div><div className="p-6">
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase dark:text-blue-400">{item?.title}</p>
                    <div className='flex justify-between'>
                      <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 mt-3">
                        {item?.publisher?.label}</p>
                      <p className="text-xs font-medium text-green-600 uppercase dark:text-blue-400 mt-3">
                        #{item?.tags?.label}</p>

                    </div>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">

                      {item?.description}
                    </p>
                  </div>

                  <div className="mt-4">


                    <div className='flex justify-between items-center mt-4'>
                      <div>
                        <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                          {moment(item?.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                      </div>
                     <Link to={`/articleDetails/${item?._id}`}>
                      <button
                        className='disabled:cursor-not-allowed text-sm bg-[#23BE0A] p-2 text-white rounded-md'>Details</button>
                    </Link>

                    </div>




                  </div>
                </div>
            </div>
          </div>)
        
      }
    </div>
    </div>
  )
}

export default PremiumArticle;