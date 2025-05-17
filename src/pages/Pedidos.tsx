
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PedidosContent from '../components/PedidosContent';

const Pedidos = () => {
  return (
    <div className="flex h-screen bg-acai-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <PedidosContent />
      </div>
    </div>
  );
};

export default Pedidos;
