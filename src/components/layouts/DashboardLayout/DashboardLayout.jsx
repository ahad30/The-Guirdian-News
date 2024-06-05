
import { NavLink, Outlet } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import useAdmin from "../../../hooks/useAdmin";
import { GoHome } from "react-icons/go";


const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  return (

    <>
    <div className="flex">
    <div>
   { 
  isAdmin && 
  <>
  <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl rounded-none shadow-blue-gray-900/5 bg-cyan-700">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
        Admin
        </Typography>
      </div>
      <List className="text-white">
      <NavLink to="/dashboard/adminHome">   
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
                                    
       Dashboard Statistics
        </ListItem>
           </NavLink>

          <NavLink to="/dashboard/allArticle">                                
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Article
        </ListItem>
          </NavLink>

          <NavLink to="/dashboard/addPublisher">                                
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
           Add Publisher
        
        </ListItem>
           </NavLink>

        <NavLink to="/dashboard/allUser">                                
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
         All User
        </ListItem>
           </NavLink>
        <NavLink to="/">                                
        <ListItem>
          <ListItemPrefix>
            <GoHome className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
           </NavLink>
       
    </List>
    </Card>
  </> 
}
    </div>

    <div className="w-[90%] mx-auto">
      <Outlet />
    </div>
    </div>
    </>
  );
};

export default DashboardLayout;
