
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SummaryCards from '../components/relatorios/SummaryCards';
import ReportTabs from '../components/relatorios/ReportTabs';
import DailySalesChart from '../components/relatorios/DailySalesChart';
import HourlySalesChart from '../components/relatorios/HourlySalesChart';
import ExportOptions from '../components/relatorios/ExportOptions';
import DateRangeSelector from '../components/relatorios/DateRangeSelector';
import { useIsMobile } from "@/hooks/use-mobile";

// Dados mockados para os gráficos
const vendasPorDia = [
  { data: '01/05', valor: 1000 },
  { data: '02/05', valor: 1300 },
  { data: '03/05', valor: 1600 },
  { data: '04/05', valor: 700 },
  { data: '05/05', valor: 1900 },
  { data: '06/05', valor: 2200 },
  { data: '07/05', valor: 1450 },
  { data: '08/05', valor: 1750 },
];

const vendasPorHora = [
  { nome: '10h-13h', valor: 25, color: '#7B2CBF' },
  { nome: '13h-16h', valor: 30, color: '#9D4EDD' },
  { nome: '16h-19h', valor: 22, color: '#5A189A' },
  { nome: '19h-22h', valor: 15, color: '#3C096C' },
  { nome: 'Outros', valor: 8, color: '#240046' },
];

// Cores para o gráfico de pizza
const COLORS = ['#7B2CBF', '#9D4EDD', '#5A189A', '#3C096C', '#240046'];

const Relatorios = () => {
  const isMobile = useIsMobile();
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
            
            {/* Cards de resumo */}
            <SummaryCards salesData={salesData} />
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
              <DailySalesChart data={vendasPorDia} />
              <HourlySalesChart data={vendasPorHora} colors={COLORS} />
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
