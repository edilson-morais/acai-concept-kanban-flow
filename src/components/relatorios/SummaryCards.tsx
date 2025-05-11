
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
    <Card className={className}>
      <div className="p-4">
        <h3 className="text-sm md:text-base font-medium">{title}</h3>
        <p className="text-xl md:text-2xl font-bold mt-3">{value}</p>
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
        className="bg-gradient-to-r from-acai-500 to-acai-600"
      />
      <SummaryCard 
        title="Ticket Médio"
        value={salesData.averageTicket}
        change={{ value: salesData.averageTicketChange, isPositive: true }}
        className="bg-gradient-to-r from-acai-700 to-acai-800"
      />
      <SummaryCard 
        title="Quantidade de Pedidos"
        value={salesData.orderCount}
        change={{ value: salesData.orderCountChange, isPositive: true }}
        className="bg-gradient-to-r from-acai-600 to-acai-500"
      />
      <SummaryCard 
        title="Vendas do Dia"
        value={salesData.dailySales}
        change={{ value: salesData.dailySalesChange, isPositive: false }}
        className="bg-gradient-to-r from-acai-400 to-acai-300"
      />
    </div>
  );
};

export default SummaryCards;
