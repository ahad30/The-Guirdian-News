import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { Spinner } from "@material-tailwind/react";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex flex-col items-center justify-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
          </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;