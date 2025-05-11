
import React from 'react';
import { receitasDespesas } from './financeiro/financeiro-utils';
import SummaryCards from './financeiro/SummaryCards';
import ReceitasDespesasChart from './financeiro/ReceitasDespesasChart';
import DistribuicaoDespesasChart from './financeiro/DistribuicaoDespesasChart';
import MovimentacoesTable from './financeiro/MovimentacoesTable';

const FinanceiroTab: React.FC = () => {
  // Calcular o lucro total do período
  const totalReceitas = receitasDespesas.reduce((sum, item) => sum + item.receita, 0);
  const totalDespesas = receitasDespesas.reduce((sum, item) => sum + item.despesa, 0);
  const lucroTotal = totalReceitas - totalDespesas;
  
  return (
    <div className="space-y-5 mt-4">
      {/* Cards de resumo financeiro */}
      <SummaryCards 
        totalReceitas={totalReceitas} 
        totalDespesas={totalDespesas} 
        lucroTotal={lucroTotal} 
      />
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Receitas e Despesas */}
        <ReceitasDespesasChart />
        
        {/* Gráfico de Distribuição de Despesas */}
        <DistribuicaoDespesasChart />
      </div>
      
      {/* Tabela de movimentações financeiras */}
      <MovimentacoesTable />
    </div>
  );
};

export default FinanceiroTab;
