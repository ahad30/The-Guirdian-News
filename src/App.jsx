import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { routes } from "./Routes/routes";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <>
    <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={routes} />
    <Toaster />
    </HelmetProvider>
    </AuthProvider>
    
   
    </>
  );
}

export default App;
