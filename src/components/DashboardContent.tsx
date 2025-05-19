
import React, { useEffect, useState } from 'react';
import StatCards from './StatCards';
import KanbanBoard from './KanbanBoard';
import ChartPanel from './ChartPanel';
import { Order } from '../types';
import { toast } from 'sonner';
import { supabase } from "../integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

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

  // Exemplo de pedidos caso a tabela não exista no Supabase
  const exemploOrders: Order[] = [
    {
      id: '1',
      customerName: 'Maria Silva',
      items: ['2x Açaí 500ml', '1x Mix Berry'],
      phone: '11999998888',
      time: '14:30',
      status: 'new'
    },
    {
      id: '2',
      customerName: 'João Santos',
      items: ['1x Açaí 300ml'],
      phone: '11988887777',
      time: '15:45',
      status: 'preparing'
    },
    {
      id: '3',
      customerName: 'Ana Oliveira',
      items: ['1x Açaí 700ml', '1x Açaí 300ml'],
      phone: '11977776666',
      time: '16:20',
      status: 'ready'
    },
    {
      id: '4',
      customerName: 'Carlos Pereira',
      items: ['2x Mix Berry'],
      phone: '11966665555',
      time: '17:10',
      status: 'completed'
    }
  ];

  // Buscar pedidos do Supabase
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Verificar se existe a tabela no Supabase usando as tabelas existentes
      let hasTable = false;
      try {
        // Tentamos verificar se podemos obter dados de uma tabela existente
        const { data: existingTableData } = await supabase
          .from('adriana_producoes')
          .select('count')
          .limit(1)
          .maybeSingle();
          
        hasTable = existingTableData !== null;
      } catch (error) {
        console.log('Erro ao verificar tabela existente:', error);
        hasTable = false;
      }

      if (!hasTable) {
        // Se não encontrar tabela válida, usar dados de exemplo
        setOrders(exemploOrders);
        setIsLoading(false);
        console.log('Usando dados de exemplo para o dashboard');
        return;
      }

      // Se chegou aqui, significa que pode haver uma tabela personalizada
      // mas como não temos acesso a ela nos tipos, usamos dados de exemplo
      setOrders(exemploOrders);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      toast.error('Falha ao carregar pedidos');
      setOrders(exemploOrders); // Em caso de erro, usar dados de exemplo
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
          // Usamos qualquer tabela existente para o canal
          table: 'adriana_producoes'
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
      // Como não temos acesso à tabela real nos tipos, atualizamos apenas o estado local
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
      // Como não temos acesso à tabela real nos tipos, atualizamos apenas o estado local
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
    <main className="flex-1 overflow-y-auto p-3 md:p-6">
      <div className="flex flex-col gap-3 md:gap-5">
        <div className="w-full">
          <StatCards 
            newOrdersCount={newOrders.length} 
            totalOrdersCount={orders.length} 
            preparingOrdersCount={preparingOrders.length} 
            completedOrdersCount={completedOrders.length} 
          />
          
          <div className={`mt-3 md:mt-5 ${isMobile ? 'h-[50vh]' : 'h-[calc(100vh-400px)]'}`}>
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
        
        <div className="w-full mt-3 md:mt-5 h-64 md:h-96">
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
