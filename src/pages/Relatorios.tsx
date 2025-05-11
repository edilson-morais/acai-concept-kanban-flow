
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ReportTabs from '../components/relatorios/ReportTabs';
import ExportOptions from '../components/relatorios/ExportOptions';
import DateRangeSelector from '../components/relatorios/DateRangeSelector';
import VendasTab from '../components/relatorios/tabs/VendasTab';
import ProdutosTab from '../components/relatorios/tabs/ProdutosTab';
import ClientesTab from '../components/relatorios/tabs/ClientesTab';
import FinanceiroTab from '../components/relatorios/tabs/FinanceiroTab';
import { TabsContent } from "@/components/ui/tabs";

const Relatorios = () => {
  const [dataInicial, setDataInicial] = useState('2025-05-01');
  const [dataFinal, setDataFinal] = useState('2025-05-08');
  const [tabAtiva, setTabAtiva] = useState('vendas');

  // Dados para os cards de resumo
  const salesData = {
    totalSales: 'R$ 9.780,00',
    averageTicket: 'R$ 32,60',
    orderCount: '300',
    dailySales: 'R$ 1.450,00',
    totalSalesChange: '12% vs período anterior',
    averageTicketChange: '4% vs período anterior',
    orderCountChange: '8% vs período anterior',
    dailySalesChange: '3% vs ontem',
  };

  return (
    <div className="flex h-screen bg-acai-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <div className="flex flex-col gap-3 md:gap-5">
            {/* Título da página e controles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 md:mb-4">
              <h1 className="text-xl md:text-2xl font-bold">Relatórios</h1>
              
              <div className="flex mt-2 md:mt-0 items-center bg-acai-800 bg-opacity-50 px-2 py-1 rounded-md">
                <div className="bg-acai-700 bg-opacity-50 px-2 py-1 rounded-md text-xs md:text-sm flex items-center mr-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="mr-1">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span>Acesso restrito: Administradores</span>
                </div>
                
                <DateRangeSelector
                  startDate={dataInicial}
                  endDate={dataFinal}
                  onStartDateChange={setDataInicial}
                  onEndDateChange={setDataFinal}
                />
              </div>
            </div>
            
            {/* Tabs de navegação */}
            <ReportTabs 
              activeTab={tabAtiva}
              onTabChange={setTabAtiva}
            />
            
            {/* Conteúdo das abas */}
            <div>
              {tabAtiva === 'vendas' && <VendasTab salesData={salesData} />}
              {tabAtiva === 'produtos' && <ProdutosTab />}
              {tabAtiva === 'clientes' && <ClientesTab />}
              {tabAtiva === 'financeiro' && <FinanceiroTab />}
            </div>
            
            {/* Opções de exportação */}
            <ExportOptions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
