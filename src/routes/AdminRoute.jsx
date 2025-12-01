import React from 'react';
import useAuth from '../hooks/useAuth';
import AnimatedLoadingPage from '../pages/Loading/AnimatedLoadingPage';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const AdminRoute = (children) => {
    const {loading} = useAuth()
    const {role,roleLoading} = useRole()
    if(loading||roleLoading){
        return <AnimatedLoadingPage/>
    }

    if(role !== 'admin'){
        return <Forbidden/>
    }
    return children
};

export default AdminRoute;