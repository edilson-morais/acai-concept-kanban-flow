
// Utility functions for the financeiro tab

// Função para formatar valores monetários no estilo brasileiro
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

// Dados mockados para o financeiro
export const receitasDespesas = [
  { data: '01/05', receita: 1500, despesa: 800 },
  { data: '02/05', receita: 1700, despesa: 750 },
  { data: '03/05', receita: 2100, despesa: 900 },
  { data: '04/05', receita: 1200, despesa: 850 },
  { data: '05/05', receita: 2300, despesa: 950 },
  { data: '06/05', receita: 2500, despesa: 1000 },
  { data: '07/05', receita: 1800, despesa: 800 },
  { data: '08/05', receita: 2000, despesa: 850 },
];

// Cores mais vibrantes para o gráfico de distribuição
export const distribuicaoDespesas = [
  { categoria: 'Insumos', valor: 45, color: '#8B5CF6' },
  { categoria: 'Funcionários', valor: 25, color: '#7B2CBF' },
  { categoria: 'Aluguel', valor: 15, color: '#6E59A5' },
  { categoria: 'Marketing', valor: 10, color: '#C77DFF' },
  { categoria: 'Outros', valor: 5, color: '#D6BCFA' },
];

// Cores mais vibrantes para o gráfico
export const COLORS = ['#8B5CF6', '#7B2CBF', '#6E59A5', '#C77DFF', '#D6BCFA'];
