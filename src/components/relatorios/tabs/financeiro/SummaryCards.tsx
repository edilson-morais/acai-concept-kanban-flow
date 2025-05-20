
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
      <Card className="bg-gradient-to-br from-acai-500/90 to-acai-600 p-4 shadow-lg border border-acai-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/5 rounded-full blur-2xl"></div>
        <h3 className="text-sm md:text-base font-medium text-white/90 relative z-10">Receita Total</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white relative z-10">{formatCurrency(totalReceitas)}</p>
        <p className="text-sm flex items-center mt-2 text-green-300 relative z-10">
          <ArrowUp className="h-4 w-4 mr-1" />
          8% vs período anterior
        </p>
      </Card>
      
      <Card className="bg-gradient-to-br from-acai-700/90 to-acai-800 p-4 shadow-lg border border-acai-600/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/5 rounded-full blur-2xl"></div>
        <h3 className="text-sm md:text-base font-medium text-white/90 relative z-10">Despesas Totais</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white relative z-10">{formatCurrency(totalDespesas)}</p>
        <p className="text-sm flex items-center mt-2 text-red-300 relative z-10">
          <ArrowDown className="h-4 w-4 mr-1" />
          5% vs período anterior
        </p>
      </Card>
      
      <Card className="bg-gradient-to-br from-acai-400/90 to-acai-300 p-4 shadow-lg border border-acai-200/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/5 rounded-full blur-2xl"></div>
        <h3 className="text-sm md:text-base font-medium text-white/90 relative z-10">Lucro Período</h3>
        <p className="text-xl md:text-2xl font-bold mt-3 text-white relative z-10">{formatCurrency(lucroTotal)}</p>
        <p className="text-sm flex items-center mt-2 text-green-300 relative z-10">
          <ArrowUp className="h-4 w-4 mr-1" />
          12% vs período anterior
        </p>
      </Card>
    </div>
  );
};

export default SummaryCards;
