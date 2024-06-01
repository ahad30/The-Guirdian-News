import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../components/common/ErrorPage/ErrorPage";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UpdateItem from "../Pages/UpdateItem/UpdateItem";
import ArtCraftCategoryDetails from "../Pages/Home/ArtCraftCategoryDetails/ArtCraftCategoryDetails";
import AddQuery from "../Pages/AddQuery/AddQuery";
import MyQueryList from "../Pages/MyQueryList/MyQueryList";
import AllQueries from "../Pages/AllQueries/AllQueries";
import AllQyeryDetails from "../Pages/AllQueries/AllQyeryDetails/AllQyeryDetails";
import MyRecommendation from "../Pages/MyRecommendation/MyRecommendation";
import RecommendationRequest from "../Pages/RecommendationRequest/RecommendationRequest";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
        loader: () =>
         fetch(`${import.meta.env.VITE_API_URL}/getSingleQuery`)
      },

      {
        path: "/allQueries",
        element:  <AllQueries/>,
      },

      {
        path: "/queryDetails/:id",
        element: 
       <PrivateRoute>
        <AllQyeryDetails></AllQyeryDetails>
       </PrivateRoute>,
        loader: ({ params }) =>
         fetch(`${import.meta.env.VITE_API_URL}/queryDetails/${params.id}`)
      },

      {
        path: "/myRecommendation",
        element: 
       <PrivateRoute>
        <MyRecommendation></MyRecommendation>
       </PrivateRoute>,

      },
      {
        path: "/recommendationRequest",
        element: 
       <PrivateRoute>
        <RecommendationRequest></RecommendationRequest>
       </PrivateRoute>
      },


      {
        path: "/addQuery",
        element: 
       <PrivateRoute>
         <AddQuery/>
       </PrivateRoute>
      },
      
      {
        path: "/myQueryList",
        element: 
       <PrivateRoute>
         <MyQueryList/>
       </PrivateRoute>
      },

      {
        path: "/updateItem/:id",
        element: 
       <PrivateRoute>
         <UpdateItem/>
       </PrivateRoute>,
        loader: ({ params }) =>
         fetch(`${import.meta.env.VITE_API_URL}/queryDetails/${params.id}`)
      },

     

      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/register",
        element: <Register/>,
      },

      {
        path: "/contact",
        element: <Contact />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/admin",
        element: <div>Admin</div>,
      },
    ],
  },
]);
