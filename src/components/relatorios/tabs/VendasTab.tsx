
import React from 'react';
import SummaryCards from '../SummaryCards';
import DailySalesChart from '../DailySalesChart';
import HourlySalesChart from '../HourlySalesChart';

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
  { nome: '10h-13h', valor: 25, color: '#1EAEDB' },
  { nome: '13h-16h', valor: 30, color: '#33C3F0' },
  { nome: '16h-19h', valor: 22, color: '#0FA0CE' },
  { nome: '19h-22h', valor: 15, color: '#403E43' },
  { nome: 'Outros', valor: 8, color: '#8EDCF7' },
];

// Blue colors for the pie chart
const COLORS = ['#1EAEDB', '#33C3F0', '#0FA0CE', '#403E43', '#8EDCF7'];

interface VendasTabProps {
  salesData: {
    totalSales: string;
    averageTicket: string;
    orderCount: string;
    dailySales: string;
    totalSalesChange: string;
    averageTicketChange: string;
    orderCountChange: string;
    dailySalesChange: string;
  };
}

const VendasTab: React.FC<VendasTabProps> = ({ salesData }) => {
  return (
    <div className="space-y-5">
      {/* Cards de resumo */}
      <SummaryCards salesData={salesData} />
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
        <DailySalesChart data={vendasPorDia} />
        <HourlySalesChart data={vendasPorHora} colors={COLORS} />
      </div>
    </div>
  );
};

export default VendasTab;
