import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { routes } from "./Routes/routes";
import AuthProvider from "./Providers/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <RouterProvider router={routes} />
    <Toaster />
    </HelmetProvider>
    </QueryClientProvider>
    </AuthProvider>
    
  
    </>
  );
}

export default App;
