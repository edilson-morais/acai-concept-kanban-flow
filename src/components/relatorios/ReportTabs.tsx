
import React from 'react';
import { Button } from "@/components/ui/button";

interface ReportTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-acai-800 bg-opacity-50 rounded-md p-1 flex overflow-x-auto">
      <Button
        variant={activeTab === 'vendas' ? 'default' : 'ghost'}
        className={`flex-1 ${activeTab === 'vendas' ? 'bg-acai-500' : ''}`}
        onClick={() => onTabChange('vendas')}
      >
        Vendas
      </Button>
      <Button
        variant={activeTab === 'produtos' ? 'default' : 'ghost'}
        className={`flex-1 ${activeTab === 'produtos' ? 'bg-acai-500' : ''}`}
        onClick={() => onTabChange('produtos')}
      >
        Produtos
      </Button>
      <Button
        variant={activeTab === 'clientes' ? 'default' : 'ghost'}
        className={`flex-1 ${activeTab === 'clientes' ? 'bg-acai-500' : ''}`}
        onClick={() => onTabChange('clientes')}
      >
        Clientes
      </Button>
      <Button
        variant={activeTab === 'financeiro' ? 'default' : 'ghost'}
        className={`flex-1 ${activeTab === 'financeiro' ? 'bg-acai-500' : ''}`}
        onClick={() => onTabChange('financeiro')}
      >
        Financeiro
      </Button>
    </div>
  );
};

export default ReportTabs;
