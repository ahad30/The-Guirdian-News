import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const Slider = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/trendingArticles')
      .then(res => {
        // console.log(res.data)
        setTrendingArticles(res.data);
      })
      .catch(error => console.error('Error fetching trending articles:', error));
  }, [axiosPublic]);

  return (

    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    loop ={true}
    autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
    pagination={{ clickable: true }}
  >
   {
     trendingArticles.map((item)=> (
       <>
     
      <SwiperSlide key={item?._id}>
         <section
    className="bg-gray-900 text- mb-10  bg-no-repeat bg-cover 
    h-[600px] lg:h-[500px] bg-center"  style={{backgroundImage: `url(${item?.image})`}}>
    <div className="mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-deep-purple-900 bg-clip-text text-3xl font-bold sm:text-4xl">
         {item?.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-2xl text-black font-bold">
      #{item?.tags.label}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div>
                <a className="block w-full  px-6 py-3 bg-[#0BE58A]  font-bold  border-[#1DD10066] lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                    Explore Now
                </a>
                </div>
             
            </div>
        </div>
    </div>
    </section>
      </SwiperSlide>
      </>
    ))
   }
 

    </Swiper>


 
  )
}

export default Slider;
