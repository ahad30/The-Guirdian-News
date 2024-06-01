import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import Image1 from '../../assets/Banner-1.jpg'
import Image2 from '../../assets/Banner-2.jpg'
import Image3 from '../../assets/Banner-3.jpg'

const Slider = () => {
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
      <SwiperSlide>
      <section
    className="bg-gray-900 text- mb-10  bg-no-repeat bg-cover 
    h-[600px] lg:h-[500px] bg-center"  style={{backgroundImage: `url(${Image1})`}}>
    <div className="mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-black bg-clip-text text-3xl font-bold sm:text-4xl">
          Find your best product now
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-base/relaxed text-black">
      lets share your thoughts
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div>
                <a className="block w-full  px-6 py-3 bg-[#0BE58A]  font-bold  border-[#1DD10066] lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                    Explore Now
                </a>
                </div>
                <div>
                <a className="block w-full  px-6 py-3 bg-transparent  font-bold border border-black lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                   Our Feedback
                </a>
                </div>
            </div>
        </div>
    </div>
    </section>
      </SwiperSlide>
      <SwiperSlide>
      <section
    className="bg-gray-900 text-black mb-10  bg-no-repeat bg-cover 
    h-[600px] lg:h-[500px] bg-center"  style={{backgroundImage: `url(${Image2})`}}>
    <div className="mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-black bg-clip-text text-3xl font-bold sm:text-4xl ">
           Find your best product now
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-base/relaxed text-black">
         lets share your thoughts
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div>
                <a className="block w-full  px-6 py-3 bg-[#0BE58A]  font-bold  border-[#1DD10066] lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                    Explore Now
                </a>
                </div>
                <div>
                <a className="block w-full  px-6 py-3 bg-transparent  font-bold border border-black lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                   Our Feedback
                </a>
                </div>
            </div>
        </div>
    </div>
    </section>
  
  </SwiperSlide>
      <SwiperSlide>
      <section
    className="bg-gray-900 text-black mb-10  bg-no-repeat bg-cover 
    h-[600px] lg:h-[500px] bg-center"  style={{backgroundImage: `url(${Image3})`}}>
    <div className="mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-black bg-clip-text text-3xl font-bold sm:text-4xl ">
           Find your best product now
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-base/relaxed text-black">
         lets share your thoughts
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div>
                <a className="block w-full  px-6 py-3 bg-[#0BE58A]  font-bold  border-[#1DD10066] lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                    Explore Now
                </a>
                </div>
                <div>
                <a className="block w-full  px-6 py-3 bg-transparent  font-bold border border-black lg:text-lg  text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto rounded-full"
                    href="">
                   Our Feedback
                </a>
                </div>
            </div>
        </div>
    </div>
    </section>
      </SwiperSlide>

    </Swiper>


 
  )
}

export default Slider;
