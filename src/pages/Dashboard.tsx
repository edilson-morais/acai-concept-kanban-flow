
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-acai-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
