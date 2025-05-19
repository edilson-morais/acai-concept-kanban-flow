
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          <div className="container mx-auto">
            <div className="bg-[#111] rounded-lg border border-gray-800 shadow-xl">
              {/* Header com logo e título */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center">
                  <div className="bg-blue-500 h-8 w-8 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <h1 className="text-lg md:text-xl font-semibold text-white">
                    Relatório Meta Ads 1.0
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-md px-3 py-1">
                    <span className="text-white text-xs">Meta</span>
                  </div>
                </div>
              </div>
              
              {/* Conteúdo do dashboard */}
              <div className="p-4">
                <DashboardContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
