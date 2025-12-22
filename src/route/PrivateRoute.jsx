import React from 'react';
import useAuth from '../authentication/context/useAuth';
import { Navigate, useLocation } from 'react-router';
// import Loading from '../components/Loading/Loading';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ children }) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    if (loading) {
       return Loader2
   }
    
    if (!user) {
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    
    return (children);
};

export default PrivateRoute;