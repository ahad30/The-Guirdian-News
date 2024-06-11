import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Spinner } from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const MainLayout = () => {
  const {loading} = useContext(AuthContext);

  return (


    
       <div>
    
     { loading ? (<div className="flex justify-center items-center flex-col h-full p-48">
             <Spinner className="h-16 w-16 text-gray-900/50" />
               </div>) :
    (<>
      <Header />
      <Outlet />
      <Footer />
    </>)}

    </div>
    
  );
};

export default MainLayout;
