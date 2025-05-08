
import React, { useState } from 'react';
import StatCards from './StatCards';
import KanbanBoard from './KanbanBoard';
import ChartPanel from './ChartPanel';
import { Order } from '../types';
import { toast } from 'sonner';

const DashboardContent = () => {
  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '5423',
      customerName: 'Marcos Silva',
      items: ['1x Açaí 500ml', '2x Leite em pó', '1x Banana'],
      phone: '(11) 98765-4321',
      time: '14:30',
      status: 'new'
    },
    {
      id: '5424',
      customerName: 'Ana Costa',
      items: ['2x Açaí 300ml', '1x Granola', '2x Morango'],
      phone: '(11) 97123-5678',
      time: '14:35',
      status: 'new'
    },
    {
      id: '5421',
      customerName: 'João Pereira',
      items: ['1x Açaí 700ml', '3x Nutella', '1x Morango'],
      phone: '(11) 99432-8765',
      time: '14:20',
      status: 'preparing'
    },
    {
      id: '5420',
      customerName: 'Carla Mendes',
      items: ['2x Açaí 300ml', '2x Granola', '1x Banana'],
      phone: '(11) 95678-2143',
      time: '14:15',
      status: 'ready'
    },
    {
      id: '5418',
      customerName: 'Pedro Oliveira',
      items: ['1x Açaí 500ml', '1x Leite Cond.', '2x Kiwi'],
      phone: '(11) 91234-8765',
      time: '14:00',
      status: 'completed'
    },
    {
      id: '5419',
      customerName: 'Renata Lima',
      items: ['1x Açaí 700ml', '2x Chocolate', '1x Morango'],
      phone: '(11) 94567-1234',
      time: '14:05',
      status: 'completed'
    },
  ]);

  const hourlyData = [
    { time: '10-12h', orders: 10 },
    { time: '12-15h', orders: 15 },
    { time: '15-18h', orders: 8 },
    { time: '18-21h', orders: 18 },
  ];

  const topSellingItems = [
    { name: 'Açaí 500ml', count: 45 },
    { name: 'Açaí 300ml', count: 35 },
    { name: 'Açaí 700ml', count: 30 },
    { name: 'Mix Berry', count: 20 },
  ];

  // Handler to move order to next status
  const handleMoveOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const newStatus = 
          order.status === 'new' ? 'preparing' :
          order.status === 'preparing' ? 'ready' :
          order.status === 'ready' ? 'completed' :
          order.status;
        
        toast.success(`Pedido #${orderId} movido para ${getStatusLabel(newStatus)}`);
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'new': return 'Novos Pedidos';
      case 'preparing': return 'Em Preparo';
      case 'ready': return 'Pronto p/ Entrega';
      case 'completed': return 'Finalizado';
      default: return status;
    }
  };

  const handleNewOrder = () => {
    toast.info('Funcionalidade de novo pedido em breve!');
  };

  // Filter orders by status
  const newOrders = orders.filter(order => order.status === 'new');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <StatCards 
        newOrdersCount={newOrders.length} 
        totalOrdersCount={orders.length} 
        preparingOrdersCount={preparingOrders.length} 
        completedOrdersCount={completedOrders.length} 
      />
      
      <div className="flex h-[calc(100%-130px)]">
        <div className="flex-1">
          <KanbanBoard 
            newOrders={newOrders}
            preparingOrders={preparingOrders}
            readyOrders={readyOrders}
            completedOrders={completedOrders}
            onMoveOrder={handleMoveOrder}
            onNewOrder={handleNewOrder}
          />
        </div>

        <div className="w-72 ml-5">
          <ChartPanel 
            hourlyData={hourlyData} 
            topSellingItems={topSellingItems} 
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
