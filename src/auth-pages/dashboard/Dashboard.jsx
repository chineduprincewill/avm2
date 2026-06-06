import React, { useContext, useState } from 'react'
import { Button } from '../../components/ui/button';
import { AppContext } from '../../context/AppContext';
import VendorDashboard from './vendor-dashboard';
import { useAuth } from '../../hooks/useAuth';
import SystemDashboard from './system-dashboard';

const Dashboard = () => {

    const { user } = useAuth();
  
    return (
        user && user?.category === 'vendor' ? 
        <VendorDashboard /> : <SystemDashboard />
    );
}

export default Dashboard