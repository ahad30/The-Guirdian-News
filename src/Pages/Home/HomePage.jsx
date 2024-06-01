import { Helmet } from "react-helmet-async";
import Contact from "../Contact/Contact";
import { useLoaderData } from "react-router-dom";
import Blog from "./Blog/Blog";
// import ArtCraftCategory from "./ArtCraftCategory/ArtCraftCategory";
import Slider from "./Slider";
import { Banner } from "./Banner";
import RecentQueries from "./RecentQueries/RecentQueries";

const HomePage = () => {

  const loadedItems = useLoaderData();
  console.log(loadedItems);
  
  return (
    <div className="max-w-7xl mx-auto">
     <Helmet>
      <title>Guirdian | Home </title>
    </Helmet>
     <Slider></Slider>
     <Banner></Banner>
     <RecentQueries loadedItems = {loadedItems}></RecentQueries>
     <Blog></Blog>
     <Contact></Contact>
    </div>
  );
};

export default HomePage;
