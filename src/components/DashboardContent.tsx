
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
      // Usar dados de exemplo
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
    <main className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {/* Seção de Campanhas Publicadas */}
        <div className="w-full bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-[#060606] p-3 border-b border-gray-800">
            <h2 className="text-white text-lg font-medium">Campanhas Publicadas</h2>
          </div>
          
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#111]">
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">#</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">Campanha</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider border-b border-gray-800">Alcance</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-blue-400 uppercase tracking-wider border-b border-gray-800">Impressões</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-green-400 uppercase tracking-wider border-b border-gray-800">Cliques</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-purple-400 uppercase tracking-wider border-b border-gray-800">Mensagens</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                      <td className="py-3 px-3 text-gray-300 text-left">{item}</td>
                      <td className="py-3 px-3 text-gray-300 text-left">Campanha {item} - Açaí Premium</td>
                      <td className="py-3 px-3 text-cyan-400 text-right">{Math.floor(Math.random() * 50000) + 10000}</td>
                      <td className="py-3 px-3 text-blue-400 text-right">{Math.floor(Math.random() * 30000) + 20000}</td>
                      <td className="py-3 px-3 text-green-400 text-right">{Math.floor(Math.random() * 500) + 50}</td>
                      <td className="py-3 px-3 text-purple-400 text-right">{Math.floor(Math.random() * 100) + 10}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Seção de Visão Geral */}
        <div className="w-full">
          <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800 mb-4">
            <div className="bg-[#060606] p-3 border-b border-gray-800">
              <h2 className="text-white text-lg font-medium">Visão Geral | Principais Métricas</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <StatCard 
                  title="Valor Investido" 
                  value="R$ 3.290,46" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Alcance" 
                  value="417.373" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Impressões" 
                  value="475.408" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="CPM" 
                  value="8,06" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Cliques" 
                  value="4.093" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Mensagens" 
                  value="1.184" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Custo por mensagem" 
                  value="R$ 3,56" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="CPC" 
                  value="R$ 1,80" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="CTR" 
                  value="0,97%" 
                  gradient="bg-[#111] border border-gray-800" 
                />
                <StatCard 
                  title="Taxa de mensagens" 
                  value="77,79%" 
                  gradient="bg-[#111] border border-gray-800" 
                />
              </div>
            </div>
          </div>
          
          {/* Gráficos e Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
              <div className="bg-[#060606] p-3 border-b border-gray-800">
                <h2 className="text-white text-lg font-medium">Maiores Taxas de Envio de Mensagens</h2>
              </div>
              <div className="p-4 h-64">
                <ChartPanel 
                  hourlyData={hourlyData} 
                  topSellingItems={topSellingItems} 
                />
              </div>
            </div>
            
            <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
              <div className="bg-[#060606] p-3 border-b border-gray-800">
                <h2 className="text-white text-lg font-medium">Melhores CPL's</h2>
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campanha</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Custo por Lead</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <tr key={item} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                        <td className="py-2 px-3 text-gray-300 text-left">Campanha {item} - Açaí Premium</td>
                        <td className="py-2 px-3 text-gray-300 text-right">R$ {(Math.random() * 5 + 1).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Terceira linha de gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
              <div className="bg-[#060606] p-3 border-b border-gray-800">
                <h2 className="text-white text-lg font-medium">Funil de Tráfego</h2>
              </div>
              <div className="p-4 h-64 flex items-center justify-center">
                <div className="w-full max-w-xs mx-auto">
                  <div className="bg-blue-600 text-white p-2 text-center mb-1 rounded-t-lg">Impressões: 475.408</div>
                  <div className="bg-blue-500 text-white p-2 text-center mb-1" style={{width: '90%', marginLeft: '5%'}}>Alcance: 417.373</div>
                  <div className="bg-blue-400 text-white p-2 text-center mb-1" style={{width: '80%', marginLeft: '10%'}}>Cliques: 4.093</div>
                  <div className="bg-blue-300 text-white p-2 text-center rounded-b-lg" style={{width: '70%', marginLeft: '15%'}}>Mensagens: 1.184</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
              <div className="bg-[#060606] p-3 border-b border-gray-800">
                <h2 className="text-white text-lg font-medium">Campanhas com Maior Investimento</h2>
              </div>
              <div className="p-4 h-64">
                <ChartPanel 
                  hourlyData={hourlyData} 
                  topSellingItems={topSellingItems} 
                />
              </div>
            </div>
          </div>
          
          {/* Última seção */}
          <div className="w-full bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-[#060606] p-3 border-b border-gray-800">
              <h2 className="text-white text-lg font-medium">Criativos Validados</h2>
            </div>
            
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">#</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-800">Ad Name</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-cyan-400 uppercase tracking-wider border-b border-gray-800">Alcance</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-green-400 uppercase tracking-wider border-b border-gray-800">Cliques</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-purple-400 uppercase tracking-wider border-b border-gray-800">Mensagens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <tr key={item} className="border-b border-gray-800 hover:bg-[#0a0a0a]">
                        <td className="py-3 px-3 text-gray-300 text-left">{item}</td>
                        <td className="py-3 px-3 text-gray-300 text-left">Ad {item} - Açaí Premium</td>
                        <td className="py-3 px-3 text-cyan-400 text-right">{Math.floor(Math.random() * 30000) + 5000}</td>
                        <td className="py-3 px-3 text-green-400 text-right">{Math.floor(Math.random() * 500) + 100}</td>
                        <td className="py-3 px-3 text-purple-400 text-right">{Math.floor(Math.random() * 100) + 10}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
