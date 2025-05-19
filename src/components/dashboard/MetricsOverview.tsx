
import React from 'react';
import StatCard from '../StatCard';

interface MetricsOverviewProps {
  metrics: {
    investido: string;
    alcance: string;
    impressoes: string;
    cpm: string;
    cliques: string;
    mensagens: string;
    custoMensagem: string;
    cpc: string;
    ctr: string;
    taxaMensagens: string;
  };
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  return (
    <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800 mb-4">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Visão Geral | Principais Métricas</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard 
            title="Valor Investido" 
            value={metrics.investido} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Alcance" 
            value={metrics.alcance} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Impressões" 
            value={metrics.impressoes} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="CPM" 
            value={metrics.cpm} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Cliques" 
            value={metrics.cliques} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Mensagens" 
            value={metrics.mensagens} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Custo por mensagem" 
            value={metrics.custoMensagem} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="CPC" 
            value={metrics.cpc} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="CTR" 
            value={metrics.ctr} 
            gradient="bg-[#111] border border-gray-800" 
          />
          <StatCard 
            title="Taxa de mensagens" 
            value={metrics.taxaMensagens} 
            gradient="bg-[#111] border border-gray-800" 
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
