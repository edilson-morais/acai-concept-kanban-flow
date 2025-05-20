
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, className }) => {
  return (
    <Card className={`backdrop-blur-md shadow-xl ${className}`}>
      <div className="p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -ml-10 -mb-10 bg-white/5 rounded-full blur-xl"></div>
        
        <h3 className="text-sm md:text-base font-medium text-white/90">{title}</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white">{value}</p>
        <p className={`text-sm flex items-center mt-2 ${change.isPositive ? 'text-green-300' : 'text-red-300'}`}>
          {change.isPositive ? 
            <ArrowUp className="h-4 w-4 mr-1" /> : 
            <ArrowDown className="h-4 w-4 mr-1" />
          }
          {change.value}
        </p>
      </div>
    </Card>
  );
};

interface SummaryCardsProps {
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

const SummaryCards: React.FC<SummaryCardsProps> = ({ salesData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 my-3">
      <SummaryCard 
        title="Total de Vendas"
        value={salesData.totalSales}
        change={{ value: salesData.totalSalesChange, isPositive: true }}
        className="bg-gradient-to-br from-acai-500/80 to-acai-600/90 border border-acai-400/20 text-white"
      />
      <SummaryCard 
        title="Ticket Médio"
        value={salesData.averageTicket}
        change={{ value: salesData.averageTicketChange, isPositive: true }}
        className="bg-gradient-to-br from-acai-700/80 to-acai-800/90 border border-acai-600/20 text-white"
      />
      <SummaryCard 
        title="Quantidade de Pedidos"
        value={salesData.orderCount}
        change={{ value: salesData.orderCountChange, isPositive: true }}
        className="bg-gradient-to-br from-acai-600/80 to-acai-500/90 border border-acai-400/20 text-white"
      />
      <SummaryCard 
        title="Vendas do Dia"
        value={salesData.dailySales}
        change={{ value: salesData.dailySalesChange, isPositive: false }}
        className="bg-gradient-to-br from-acai-400/80 to-acai-300/90 border border-acai-200/20 text-white"
      />
    </div>
  );
};

export default SummaryCards;
