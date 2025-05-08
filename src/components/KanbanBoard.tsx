
import React from 'react';
import KanbanColumn from './KanbanColumn';
import { Order } from '../types';

interface KanbanBoardProps {
  newOrders: Order[];
  preparingOrders: Order[];
  readyOrders: Order[];
  completedOrders: Order[];
  onMoveOrder: (id: string) => void;
  onNewOrder: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  newOrders,
  preparingOrders,
  readyOrders,
  completedOrders,
  onMoveOrder,
  onNewOrder
}) => {
  return (
    <>
      {/* Kanban Header */}
      <div className="bg-acai-900 rounded-md mb-4 py-3 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Kanban de Pedidos</h2>
        <button 
          onClick={onNewOrder}
          className="bg-acai-500 hover:bg-acai-600 px-4 py-1.5 rounded-full text-sm text-white transition-all"
        >
          + Novo Pedido
        </button>
      </div>
      
      {/* Kanban Board */}
      <div className="flex space-x-5 h-[calc(100%-60px)] pb-5 overflow-x-auto">
        <KanbanColumn 
          title="Novos Pedidos" 
          orders={newOrders} 
          color="bg-acai-500 bg-opacity-80" 
          onMoveOrder={onMoveOrder}
        />
        <KanbanColumn 
          title="Em Preparo" 
          orders={preparingOrders} 
          color="bg-acai-600 bg-opacity-80" 
          onMoveOrder={onMoveOrder}
        />
        <KanbanColumn 
          title="Pronto p/ Entrega" 
          orders={readyOrders} 
          color="bg-acai-700 bg-opacity-80" 
          onMoveOrder={onMoveOrder}
        />
        <KanbanColumn 
          title="Finalizado" 
          orders={completedOrders} 
          color="bg-acai-800 bg-opacity-80" 
          showMoveButton={false}
        />
      </div>
    </>
  );
};

export default KanbanBoard;
