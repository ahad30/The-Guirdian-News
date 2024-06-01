import { Button } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Typewriter } from 'react-simple-typewriter'
import "leaflet/dist/leaflet.css";

const Contact = () => {
return (
<section className="">

  <div className="flex justify-center text-2xl font-bold mt-10">
  <Typewriter
            words={['Contact Us', 'See Our Location']}
            loop={true}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
  </div>
  <div className="mx-auto  px-4 py-7 sm:px-6 lg:px-8">
    {/* <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12">
        <p className="max-w-xl text-lg">
          At the same time, the fact that we are wholly owned and totally independent from
          manufacturer and other group control gives you confidence that we will only recommend what
          is right for you.
        </p>

        <div className="mt-8">
          <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>

          <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
        </div>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
              />
            </div>
          </div>


          <div>
            <label className="sr-only" htmlFor="message">Message</label>

            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Enquiry
            </Button>
          </div>
        </form>
      </div>
    </div> */}

   <div className="">
   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="lg:w-full h-[400px]">
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
   Southeast Park
    </Popup>
  </Marker>
</MapContainer>
   </div>   



  </div>
</section>
  );
}

export default Contact