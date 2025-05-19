
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-acai-900 to-acai-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <div className="bg-acai-800/50 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-acai-700/30">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-acai-400 to-acai-300 bg-clip-text text-transparent">
                  Relatório de Vendas 1.0
                </span>
                <span className="ml-2 px-2 py-1 bg-acai-500/30 text-acai-200 text-xs rounded-md">
                  BETA
                </span>
              </h1>
              <DashboardContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
