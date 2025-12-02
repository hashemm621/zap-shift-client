import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';
import Loading from '../components/Loading/Loading';

const RiderRoute = ({children}) => {
    const {loading,user} = useAuth()
    const {role,roleLoading} = useRole()
    if(loading||roleLoading || !user){
        return <Loading/>
    }

    if(role !== 'rider'){
        return <Forbidden/>
    }
    return children
};

export default RiderRoute;