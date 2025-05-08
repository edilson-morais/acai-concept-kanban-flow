
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Novos Pedidos" 
        value={newOrdersCount} 
        gradient="bg-gradient-to-r from-acai-500 to-acai-600" 
      />
      <StatCard 
        title="Pedidos do Dia" 
        value={totalOrdersCount} 
        gradient="bg-gradient-to-r from-acai-700 to-acai-800" 
      />
      <StatCard 
        title="Em Preparo" 
        value={preparingOrdersCount} 
        gradient="bg-gradient-to-r from-acai-600 to-acai-500" 
      />
      <StatCard 
        title="Concluídos" 
        value={completedOrdersCount} 
        gradient="bg-gradient-to-r from-acai-400 to-acai-300" 
      />
    </div>
  );
};

export default StatCards;
