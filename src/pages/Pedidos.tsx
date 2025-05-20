
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PedidosContent from '../components/PedidosContent';

const Pedidos = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-acai-900 to-acai-800 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 p-2 md:p-4 overflow-hidden bg-gradient-to-br from-acai-900 via-acai-800 to-acai-900">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm border border-white/5">
            <PedidosContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
