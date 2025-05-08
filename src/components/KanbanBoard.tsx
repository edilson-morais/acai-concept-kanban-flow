
import React from 'react';
import KanbanColumn from './KanbanColumn';
import { Order } from '../types';

interface KanbanBoardProps {
  newOrders: Order[];
  preparingOrders: Order[];
  readyOrders: Order[];
  completedOrders: Order[];
  onMoveOrder: (id: string, currentStatus: string) => void;
  onMoveBackOrder: (id: string, currentStatus: string) => void;
  onNewOrder: () => void;
  isLoading?: boolean;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  newOrders,
  preparingOrders,
  readyOrders,
  completedOrders,
  onMoveOrder,
  onMoveBackOrder,
  onNewOrder,
  isLoading = false
}) => {
  return (
    <>
      {/* Kanban Header */}
      <div className="bg-acai-900 rounded-md mb-4 py-3 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Pedidos</h2>
        <button onClick={onNewOrder} className="bg-acai-500 hover:bg-acai-600 px-4 py-1.5 rounded-full text-sm text-white transition-all">
          + Novo Pedido
        </button>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-acai-500"></div>
        </div>
      )}
      
      {/* Kanban Board */}
      {!isLoading && (
        <div className="flex space-x-5 h-[calc(100%-60px)] pb-5 overflow-x-auto">
          <KanbanColumn 
            title="Novos Pedidos" 
            orders={newOrders} 
            color="bg-acai-500 bg-opacity-80" 
            onMoveOrder={(id) => onMoveOrder(id, 'new')} 
            showBackButton={false}
          />
          <KanbanColumn 
            title="Em Preparo" 
            orders={preparingOrders} 
            color="bg-acai-600 bg-opacity-80" 
            onMoveOrder={(id) => onMoveOrder(id, 'preparing')} 
            onMoveBack={(id) => onMoveBackOrder(id, 'preparing')} 
            showBackButton={true}
          />
          <KanbanColumn 
            title="Pronto p/ Entrega" 
            orders={readyOrders} 
            color="bg-acai-700 bg-opacity-80" 
            onMoveOrder={(id) => onMoveOrder(id, 'ready')} 
            onMoveBack={(id) => onMoveBackOrder(id, 'ready')} 
            showBackButton={true}
          />
          <KanbanColumn 
            title="Finalizado" 
            orders={completedOrders} 
            color="bg-acai-800 bg-opacity-80" 
            showMoveButton={false}
            onMoveBack={(id) => onMoveBackOrder(id, 'completed')} 
            showBackButton={true} 
          />
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
