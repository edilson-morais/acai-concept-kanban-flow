
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="bg-acai-800 bg-opacity-50 rounded-md p-1 flex w-full overflow-x-auto">
        <TabsTrigger 
          value="vendas" 
          className={`flex-1 ${activeTab === 'vendas' ? 'bg-acai-500' : ''}`}
        >
          Vendas
        </TabsTrigger>
        <TabsTrigger 
          value="produtos" 
          className={`flex-1 ${activeTab === 'produtos' ? 'bg-acai-500' : ''}`}
        >
          Produtos
        </TabsTrigger>
        <TabsTrigger 
          value="clientes" 
          className={`flex-1 ${activeTab === 'clientes' ? 'bg-acai-500' : ''}`}
        >
          Clientes
        </TabsTrigger>
        <TabsTrigger 
          value="financeiro" 
          className={`flex-1 ${activeTab === 'financeiro' ? 'bg-acai-500' : ''}`}
        >
          Financeiro
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReportTabs;
