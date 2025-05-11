
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from './financeiro-utils';

interface SummaryCardsProps {
  totalReceitas: number;
  totalDespesas: number;
  lucroTotal: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalReceitas, totalDespesas, lucroTotal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-r from-acai-500 to-acai-600 p-4 shadow-lg">
        <h3 className="text-sm md:text-base font-medium text-white">Receita Total</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white">{formatCurrency(totalReceitas)}</p>
        <p className="text-sm flex items-center mt-2 text-green-300">
          <ArrowUp className="h-4 w-4 mr-1" />
          8% vs período anterior
        </p>
      </Card>
      
      <Card className="bg-gradient-to-r from-acai-700 to-acai-800 p-4 shadow-lg">
        <h3 className="text-sm md:text-base font-medium text-white">Despesas Totais</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white">{formatCurrency(totalDespesas)}</p>
        <p className="text-sm flex items-center mt-2 text-red-300">
          <ArrowDown className="h-4 w-4 mr-1" />
          5% vs período anterior
        </p>
      </Card>
      
      <Card className="bg-gradient-to-r from-acai-400 to-acai-300 p-4 shadow-lg">
        <h3 className="text-sm md:text-base font-medium text-white">Lucro Período</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white">{formatCurrency(lucroTotal)}</p>
        <p className="text-sm flex items-center mt-2 text-green-300">
          <ArrowUp className="h-4 w-4 mr-1" />
          12% vs período anterior
        </p>
      </Card>
    </div>
  );
};

export default SummaryCards;
