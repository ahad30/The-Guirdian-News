import { Helmet } from "react-helmet-async";
import Contact from "../Contact/Contact";

import Blog from "./Blog/Blog";
import Slider from "./Slider";
import { Banner } from "./Banner";
import RecentQueries from "./RecentPublisher/RecentPublisher";
import RecentPublisher from "./RecentPublisher/RecentPublisher";
import Statistics from "./Statistics/Statistics";
import Pricing from "./Pricing/Pricing";

const HomePage = () => {

  
  return (
    <div className="max-w-7xl mx-auto">
     <Helmet>
      <title>Guirdian | Home </title>
    </Helmet>
     <Slider></Slider>
     <Banner></Banner>
    <RecentPublisher></RecentPublisher>
    <Statistics></Statistics>
    <Pricing></Pricing>
     <Blog></Blog>
     <Contact></Contact>
    </div>
  );
};

export default HomePage;
