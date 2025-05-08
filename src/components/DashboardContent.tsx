
import React, { useEffect, useState } from 'react';
import StatCards from './StatCards';
import KanbanBoard from './KanbanBoard';
import ChartPanel from './ChartPanel';
import { Order } from '../types';
import { toast } from 'sonner';
import { supabase } from "../integrations/supabase/client";

const DashboardContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dados para os gráficos (ainda mockados por simplicidade)
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

  // Buscar pedidos do Supabase
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('acai_concept_dashboard_lovable01')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Converter os dados do Supabase para o formato utilizado no front-end
        const formattedOrders: Order[] = data.map(order => {
          // Formatar a hora a partir do timestamp created_at
          const createdAt = new Date(order.created_at);
          const hours = createdAt.getHours().toString().padStart(2, '0');
          const minutes = createdAt.getMinutes().toString().padStart(2, '0');
          const time = `${hours}:${minutes}`;

          // Converter items de JSONB para string[]
          let itemsArray: string[] = [];
          if (Array.isArray(order.items)) {
            itemsArray = order.items.map(item => {
              // Assegurar que os itens têm a estrutura esperada
              if (typeof item === 'object' && item !== null) {
                const quantity = (item as any).quantity;
                const name = (item as any).name;
                if (quantity && name) {
                  return `${quantity}x ${name}`;
                }
              }
              return "Item desconhecido";
            });
          }

          // Garantir que o status é do tipo esperado
          const status = (order.status === 'new' || 
                          order.status === 'preparing' || 
                          order.status === 'ready' || 
                          order.status === 'completed') 
                          ? order.status 
                          : 'new' as const;

          return {
            id: order.id,
            customerName: order.customer_name,
            items: itemsArray,
            phone: order.phone,
            time: time,
            status: status
          };
        });

        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      toast.error('Falha ao carregar pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Configurar atualização em tempo real
    const channel = supabase
      .channel('acai_orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'acai_concept_dashboard_lovable01'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handler para mover o pedido para o próximo status
  const handleMoveOrder = async (orderId: string, currentStatus: string) => {
    // Determinar o próximo status
    const nextStatus = 
      currentStatus === 'new' ? 'preparing' :
      currentStatus === 'preparing' ? 'ready' :
      currentStatus === 'ready' ? 'completed' :
      currentStatus;
    
    // Se não houver mudança, não faz nada
    if (nextStatus === currentStatus) return;

    try {
      const { error } = await supabase
        .from('acai_concept_dashboard_lovable01')
        .update({ status: nextStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Atualizar o estado local para resposta instantânea da UI
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: nextStatus as Order['status'] };
        }
        return order;
      }));

      toast.success(`Pedido #${orderId.substring(0, 5)} movido para ${getStatusLabel(nextStatus)}`);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Falha ao atualizar pedido');
    }
  };

  // Handler para voltar o pedido para o status anterior
  const handleMoveBackOrder = async (orderId: string, currentStatus: string) => {
    // Determinar o status anterior
    const previousStatus = 
      currentStatus === 'preparing' ? 'new' :
      currentStatus === 'ready' ? 'preparing' :
      currentStatus === 'completed' ? 'ready' :
      currentStatus;
    
    // Se não houver mudança, não faz nada
    if (previousStatus === currentStatus) return;

    try {
      const { error } = await supabase
        .from('acai_concept_dashboard_lovable01')
        .update({ status: previousStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Atualizar o estado local para resposta instantânea da UI
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: previousStatus as Order['status'] };
        }
        return order;
      }));

      toast.success(`Pedido #${orderId.substring(0, 5)} movido de volta para ${getStatusLabel(previousStatus)}`);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Falha ao atualizar pedido');
    }
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

  // Filtrar pedidos por status
  const newOrders = orders.filter(order => order.status === 'new');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-3/4">
          <StatCards 
            newOrdersCount={newOrders.length} 
            totalOrdersCount={orders.length} 
            preparingOrdersCount={preparingOrders.length} 
            completedOrdersCount={completedOrders.length} 
          />
          
          <div className="mt-5 h-[calc(100vh-230px)]">
            <KanbanBoard 
              newOrders={newOrders}
              preparingOrders={preparingOrders}
              readyOrders={readyOrders}
              completedOrders={completedOrders}
              onMoveOrder={handleMoveOrder}
              onMoveBackOrder={handleMoveBackOrder}
              onNewOrder={handleNewOrder}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        <div className="md:w-1/4 min-w-[220px]">
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
