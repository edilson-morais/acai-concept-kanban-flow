
import React from 'react';
import StatCard from './StatCard';

interface StatCardsProps {
  newOrdersCount: number;
  totalOrdersCount: number;
  preparingOrdersCount: number;
  completedOrdersCount: number;
}

const StatCards: React.FC<StatCardsProps> = ({ 
  newOrdersCount,
  totalOrdersCount,
  preparingOrdersCount,
  completedOrdersCount 
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4">
      <StatCard 
        title="Novos Pedidos" 
        value={newOrdersCount} 
        gradient="bg-[#111] border border-gray-800" 
      />
      <StatCard 
        title="Pedidos do Dia" 
        value={totalOrdersCount} 
        gradient="bg-[#111] border border-gray-800" 
      />
      <StatCard 
        title="Em Preparo" 
        value={preparingOrdersCount} 
        gradient="bg-[#111] border border-gray-800" 
      />
      <StatCard 
        title="Concluídos" 
        value={completedOrdersCount} 
        gradient="bg-[#111] border border-gray-800" 
      />
    </div>
  );
};

export default StatCards;
