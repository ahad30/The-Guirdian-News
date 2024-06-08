import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../components/common/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import UpdateItem from "../Pages/MyArticleList/UpdateItem";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllArticle from "../Pages/Dashboard/AllArticle/AllArticle";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import AllUsers from "../Pages/Dashboard/AllUser/AllUsers";
import AddArticle from "../Pages/MyArticleList/AddArticle";
import MyArticleList from "../Pages/MyArticleList/MyArticleList";
import UpdateProfile from "../Pages/Update-Profile/UpdateProfile";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AllArticlesDetails from "../Pages/AllArticles/AllArticlesDetails";
import Subscription from "../Pages/Subscription/Subscription";
import PremiumArticle from "../Pages/PremiumArticle/PremiumArticle";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
        // loader: () =>
        //  fetch(`${import.meta.env.VITE_API_URL}/getSingleQuery`)
      },

      {
        path: "/myProfile",
        element:  <PrivateRoute><UpdateProfile/></PrivateRoute>,
      },


      {
        path: "/allArticles",
        element:  <AllArticles/>,
      },

      {
        path: "/articleDetails/:id",
        element: 
       <PrivateRoute>
       <AllArticlesDetails></AllArticlesDetails>
       </PrivateRoute>,
        loader: ({ params }) =>
         fetch(`${import.meta.env.VITE_API_URL}/articleDetails/${params.id}`)
      },
 
      {
        path: "/subscription",
        element:  <PrivateRoute><Subscription/></PrivateRoute>,
      },

      {
        path: "/premiumArticle",
        element:  <PrivateRoute><PremiumArticle/></PrivateRoute>,
      },

      {
        path: "/addArticle",
        element: 
       <PrivateRoute>
         <AddArticle></AddArticle>
       </PrivateRoute>
      },
      
      {
        path: "/myArticle",
        element: 
       <PrivateRoute>
         <MyArticleList/>
       </PrivateRoute>
      },

      {
        path: "/updateItem/:id",
        element: 
       <PrivateRoute>
         <UpdateItem/>
       </PrivateRoute>,
        loader: ({ params }) =>
         fetch(`${import.meta.env.VITE_API_URL}/articleDetails/${params.id}`)
      },

      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/register",
        element: <Register/>,
      },

    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'allArticle',
        element: <AdminRoute><AllArticle></AllArticle></AdminRoute>
      },
      {
        path: 'addPublisher',
        element: <AddPublisher></AddPublisher>
      },
      {
        path: 'allUser',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ],
  },
]);
