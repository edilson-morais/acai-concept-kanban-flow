
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { toast } from 'sonner';
import { supabase } from "../integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Edit, Trash2, Plus, Filter, Clock, ChevronDown, ArrowDownUp } from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import { Order } from '@/types';

interface Pedido {
  id: string;
  numero_pedido: number;
  cliente_id: string | null;
  status: 'NOVO' | 'EM_PREPARO' | 'PRONTO' | 'FINALIZADO';
  subtotal: number;
  total: number;
  observacoes: string | null;
  created_at: string;
  clientes: {
    nome: string;
    telefone: string | null;
  } | null;
  itens_pedido: Array<{
    quantidade: number;
    produtos: {
      nome: string;
    } | null;
  }>;
}

const PedidosContent = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const isMobile = useIsMobile();

  const fetchPedidos = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select(`
          id,
          numero_pedido,
          cliente_id,
          status,
          subtotal,
          total,
          observacoes,
          created_at,
          clientes (
            nome,
            telefone
          ),
          itens_pedido (
            quantidade,
            produtos (
              nome
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar pedidos:', error);
        toast.error('Falha ao carregar pedidos');
        return;
      }

      setPedidos(data || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      toast.error('Falha ao carregar pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
    
    // Configurar atualização em tempo real
    const channel = supabase
      .channel('pedidos_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pedidos'
        },
        () => {
          fetchPedidos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCreatePedido = () => {
    toast.info('Funcionalidade de criar pedido em breve!');
  };

  const handleEditPedido = (id: string) => {
    toast.info(`Editar pedido ${id.substring(0, 8)}...`);
  };

  const handleDeletePedido = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir pedido:', error);
        toast.error('Falha ao remover pedido');
        return;
      }

      toast.success('Pedido removido com sucesso');
      fetchPedidos(); // Atualizar lista
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      toast.error('Falha ao remover pedido');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NOVO': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'EM_PREPARO': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'PRONTO': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'FINALIZADO': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getStatusName = (status: string) => {
    switch(status) {
      case 'NOVO': return 'Novo';
      case 'EM_PREPARO': return 'Em Preparo';
      case 'PRONTO': return 'Pronto';
      case 'FINALIZADO': return 'Finalizado';
      default: return status;
    }
  };

  const filteredPedidos = pedidos.filter(pedido => {
    const customerName = pedido.clientes?.nome || 'Cliente não informado';
    const phone = pedido.clientes?.telefone || '';
    return customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           phone.includes(searchTerm) ||
           pedido.numero_pedido.toString().includes(searchTerm);
  });

  // Convert Pedidos to Orders for Kanban view
  const convertToOrders = (pedidos: Pedido[]): Order[] => {
    return pedidos.map(pedido => ({
      id: pedido.id,
      customerName: pedido.clientes?.nome || 'Cliente não informado',
      items: pedido.itens_pedido.map(item => 
        `${item.quantidade}x ${item.produtos?.nome || 'Produto'}`
      ),
      phone: pedido.clientes?.telefone || '',
      status: pedido.status.toLowerCase() as 'new' | 'preparing' | 'ready' | 'completed',
      time: formatDate(pedido.created_at)
    }));
  };

  const newOrders = convertToOrders(filteredPedidos.filter(p => p.status === 'NOVO'));
  const preparingOrders = convertToOrders(filteredPedidos.filter(p => p.status === 'EM_PREPARO'));
  const readyOrders = convertToOrders(filteredPedidos.filter(p => p.status === 'PRONTO'));
  const completedOrders = convertToOrders(filteredPedidos.filter(p => p.status === 'FINALIZADO'));

  const handleMoveOrder = async (id: string, currentStatus: string) => {
    const statusMap: { [key: string]: string } = {
      'NOVO': 'EM_PREPARO',
      'EM_PREPARO': 'PRONTO',
      'PRONTO': 'FINALIZADO',
      'FINALIZADO': 'FINALIZADO'
    };

    const newStatus = statusMap[currentStatus.toUpperCase()] || currentStatus;

    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ status: newStatus as 'NOVO' | 'EM_PREPARO' | 'PRONTO' | 'FINALIZADO' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        toast.error('Falha ao atualizar status do pedido');
        return;
      }

      toast.success(`Pedido movido para ${getStatusName(newStatus)}`);
      fetchPedidos(); // Atualizar lista
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      toast.error('Falha ao atualizar status do pedido');
    }
  };

  const handleMoveBackOrder = async (id: string, currentStatus: string) => {
    const statusMap: { [key: string]: string } = {
      'EM_PREPARO': 'NOVO',
      'PRONTO': 'EM_PREPARO',
      'FINALIZADO': 'PRONTO',
      'NOVO': 'NOVO'
    };

    const newStatus = statusMap[currentStatus.toUpperCase()] || currentStatus;

    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ status: newStatus as 'NOVO' | 'EM_PREPARO' | 'PRONTO' | 'FINALIZADO' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        toast.error('Falha ao atualizar status do pedido');
        return;
      }

      toast.info(`Pedido movido de volta para ${getStatusName(newStatus)}`);
      fetchPedidos(); // Atualizar lista
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      toast.error('Falha ao atualizar status do pedido');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-3 md:p-6 bg-gradient-to-br from-acai-900 to-acai-800">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header with search and view toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">Pedidos</h1>
              <span className="bg-acai-600 text-white text-xs rounded-full px-2 py-0.5">{filteredPedidos.length}</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-acai-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-acai-800/40 backdrop-blur-md border border-acai-600/30 text-acai-100 placeholder:text-acai-400 focus:ring-2 focus:ring-acai-500/50 focus:outline-none transition-all shadow-inner"
                />
              </div>
              
              <div className="flex space-x-2 justify-end">
                <Button 
                  variant="outline" 
                  className={`bg-acai-800/40 backdrop-blur-md border-acai-600/30 hover:bg-acai-700/50 ${viewMode === 'list' ? 'text-acai-300 border-acai-500' : 'text-acai-400'}`}
                  onClick={() => setViewMode('list')}
                >
                  <Filter className="mr-1" size={16} />
                  Lista
                </Button>
                <Button 
                  variant="outline"
                  className={`bg-acai-800/40 backdrop-blur-md border-acai-600/30 hover:bg-acai-700/50 ${viewMode === 'kanban' ? 'text-acai-300 border-acai-500' : 'text-acai-400'}`}
                  onClick={() => setViewMode('kanban')}
                >
                  <Clock className="mr-1" size={16} />
                  Kanban
                </Button>
                <Button 
                  onClick={handleCreatePedido} 
                  className="bg-gradient-to-r from-acai-500 to-acai-600 hover:from-acai-600 hover:to-acai-700 text-white shadow-lg shadow-acai-500/20"
                >
                  <Plus className="mr-1" size={16} /> Novo
                </Button>
              </div>
            </div>
          </div>

          {/* Content area with view options */}
          <div className="bg-black/20 backdrop-blur-md rounded-xl border border-white/5 shadow-xl overflow-hidden">
            {viewMode === 'list' ? (
              <div className="p-4">
                {isLoading ? (
                  <div className="flex justify-center my-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-acai-500"></div>
                  </div>
                ) : filteredPedidos.length === 0 ? (
                  <div className="text-center my-12 py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-acai-800/60 flex items-center justify-center">
                      <Search className="text-acai-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-acai-200">Nenhum pedido encontrado</h3>
                    <p className="text-acai-400 mt-2">{searchTerm ? 'Tente outro termo de busca.' : 'Crie seu primeiro pedido clicando em "Novo".'}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-acai-700/30">
                          <TableHead className="text-acai-300 font-semibold">
                            <div className="flex items-center">
                              Pedido
                              <ArrowDownUp size={14} className="ml-1 text-acai-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-acai-300 font-semibold">Cliente</TableHead>
                          <TableHead className="text-acai-300 font-semibold">Itens</TableHead>
                          <TableHead className="text-acai-300 font-semibold">Total</TableHead>
                          <TableHead className="text-acai-300 font-semibold">
                            <div className="flex items-center">
                              Data
                              <ChevronDown size={14} className="ml-1 text-acai-500" />
                            </div>
                          </TableHead>
                          <TableHead className="text-acai-300 font-semibold">Status</TableHead>
                          <TableHead className="text-acai-300 font-semibold">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPedidos.map((pedido) => (
                          <TableRow key={pedido.id} className="border-b border-acai-700/20 hover:bg-acai-800/40 transition-colors duration-200">
                            <TableCell className="py-4">
                              <div className="font-medium text-acai-100">#{pedido.numero_pedido}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex flex-col">
                                <div className="font-medium text-acai-100">{pedido.clientes?.nome || 'Cliente não informado'}</div>
                                {pedido.clientes?.telefone && (
                                  <div className="flex items-center mt-1 text-xs text-acai-400">
                                    <img 
                                      src="/lovable-uploads/309e28ab-5886-4434-bf52-d2045d8d03f6.png" 
                                      alt="WhatsApp" 
                                      className="w-4 h-4 mr-1 opacity-80" 
                                    />
                                    {pedido.clientes.telefone}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {pedido.itens_pedido.slice(0, 3).map((item, idx) => (
                                  <div key={idx} className="text-sm text-acai-200 flex items-center">
                                    <span className="inline-block w-5 text-center text-acai-400">{item.quantidade}x</span>
                                    <span className="ml-1">{item.produtos?.nome || 'Produto'}</span>
                                  </div>
                                ))}
                                {pedido.itens_pedido.length > 3 && (
                                  <div className="text-xs text-acai-400">
                                    +{pedido.itens_pedido.length - 3} item(s)
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-acai-100">
                                R$ {pedido.total?.toFixed(2) || '0,00'}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-acai-400">
                              {formatDate(pedido.created_at)}
                            </TableCell>
                            <TableCell>
                              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(pedido.status)} bg-opacity-20 text-white backdrop-blur-sm shadow-sm inline-flex items-center`}>
                                <span className={`w-2 h-2 rounded-full ${getStatusColor(pedido.status)} mr-1.5`}></span>
                                {getStatusName(pedido.status)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleEditPedido(pedido.id)} 
                                  className="p-2 rounded-full bg-acai-700/30 hover:bg-acai-700/50 transition-colors duration-200 backdrop-blur-sm"
                                >
                                  <Edit size={16} className="text-acai-300" />
                                </button>
                                <button 
                                  onClick={() => handleDeletePedido(pedido.id)} 
                                  className="p-2 rounded-full bg-acai-700/30 hover:bg-red-800/40 transition-colors duration-200 backdrop-blur-sm"
                                >
                                  <Trash2 size={16} className="text-acai-300" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 h-full">
                <KanbanBoard
                  newOrders={newOrders}
                  preparingOrders={preparingOrders}
                  readyOrders={readyOrders}
                  completedOrders={completedOrders}
                  onMoveOrder={handleMoveOrder}
                  onMoveBackOrder={handleMoveBackOrder}
                  onNewOrder={handleCreatePedido}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PedidosContent;
