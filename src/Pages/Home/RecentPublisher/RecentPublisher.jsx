import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const RecentPublisher = () => {
    const [recentPublisher, setRecentPublisher] = useState([]);
  const axiosPublic = useAxiosPublic()
      
    useEffect(() => {
        Aos.init();
        axiosPublic.get(`/publishers`)
        .then((data) => {
        //   console.log(data.data)
          setRecentPublisher(data?.data);
        })

    }, []);


    return (
        <div className='mb-5'>
            <h1 className='text-center text-3xl font-bold mt-5 mb-5'>Recent Publisher</h1>
            {recentPublisher.length === 0 ? (
                <p className='text-center text-red-400 font-bold'>No data found.</p>
            ) : (
                <div
                    
                    data-aos='fade-zoom-in'
                    data-aos-offset='200'
                    data-aos-easing='ease-in-sine'
                    data-aos-duration='500'
                    className='w-[98%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {
                        recentPublisher?.map((publisher) => (
                           <>
                           <div className='' key={publisher?._id}>
                          <div className='flex justify-center'>
                          <img src={publisher.image} alt="" className='w-[300px] h-[300px] rounded-full'/>
                          </div>
                           <p className='text-center mt-3 font-bold'>{publisher?.publisherName}</p>
                           </div>
                           </>
                        ))
                    }
                        
               
                </div>
            )}
        </div>
    );
};

export default RecentPublisher;
