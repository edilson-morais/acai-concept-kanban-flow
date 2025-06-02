
export interface Order {
  id: string;
  customerName: string;
  items: string[];
  phone: string;
  time: string;
  status: 'new' | 'preparing' | 'ready' | 'completed';
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  categoria_id: string | null;
  tipo: 'acai' | 'complemento' | 'bebida' | 'adicional';
  disponivel: boolean;
  estoque_atual: number;
  estoque_minimo: number;
  imagem_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao: string | null;
  cor: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  data_nascimento: string | null;
  total_pedidos: number;
  valor_total_gasto: number;
  ultimo_pedido: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pedido {
  id: string;
  numero_pedido: number;
  cliente_id: string | null;
  status: 'NOVO' | 'EM_PREPARO' | 'PRONTO' | 'FINALIZADO';
  subtotal: number;
  desconto: number;
  total: number;
  observacoes: string | null;
  data_entrega_prevista: string | null;
  data_entrega_real: string | null;
  tipo_entrega: string;
  endereco_entrega: string | null;
  created_at: string;
  updated_at: string;
}

export interface ItemPedido {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  observacoes: string | null;
  created_at: string;
}

export interface Pagamento {
  id: string;
  pedido_id: string;
  metodo: 'dinheiro' | 'pix' | 'cartao_debito' | 'cartao_credito' | 'vale_refeicao';
  valor: number;
  troco: number;
  status: string;
  data_pagamento: string;
  observacoes: string | null;
  created_at: string;
}
