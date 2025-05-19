
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-acai-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-acai-900 to-acai-800">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-acai-50 mb-6">Relatório de Vendas 1.0</h1>
            <DashboardContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
