import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";



const DashboardLayout = () => {
  return (

    <>
    <div>
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl rounded-none shadow-blue-gray-900/5 bg-cyan-700">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
        Admin
        </Typography>
      </div>
      <List className="text-white">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/dashboard/adminHome">                                
           Admin Home
           </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/dashboard/allArticle">                                
          All Article
           </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/dashboard/addPublisher">                                
           Add Publisher
           </NavLink>
        
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/dashboard/allUser">                                
         All User
           </NavLink>
        </ListItem>
       
      </List>
    </Card>
    </div>

    <div>
      <Outlet />
    </div>
    </>
  );
};

export default DashboardLayout;
