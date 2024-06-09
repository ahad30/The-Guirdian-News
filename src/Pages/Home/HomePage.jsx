import { Helmet } from "react-helmet-async";
import Contact from "../Contact/Contact";
import Blog from "./Blog/Blog";
import Slider from "./Slider";
import { Banner } from "./Banner";
import RecentPublisher from "./RecentPublisher/RecentPublisher";
import Statistics from "./Statistics/Statistics";
import Pricing from "./Pricing/Pricing";
import { useEffect, useState } from "react";
import SubscriptionModal from "./SubscriptionModal ";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="max-w-7xl mx-auto">
     <Helmet>
      <title>Guirdian | Home </title>
    </Helmet>
    <div>
    <h2 className="text-3xl font-bold text-gray-900 sm:text-3xl text-center mb-5">
          Trending Articles
        </h2>
     <Slider></Slider>
    </div>
     <Banner></Banner>
     <SubscriptionModal isOpen={isModalOpen} closeModal={closeModal} />
    <RecentPublisher></RecentPublisher>
    <Statistics></Statistics>
    <Pricing></Pricing>
     <Blog></Blog>
     <Contact></Contact>
    </div>
  );
};

export default HomePage;
