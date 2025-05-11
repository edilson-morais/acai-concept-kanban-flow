
import React from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";
import { receitasDespesas } from './financeiro-utils';

const ReceitasDespesasChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-acai-800 bg-opacity-30 p-4 shadow-lg backdrop-blur-sm border border-acai-700">
      <h3 className="text-base md:text-lg font-bold mb-3 text-white">Receitas e Despesas</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={receitasDespesas}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="data" 
              stroke="rgba(255, 255, 255, 0.7)" 
              fontSize={isMobile ? 10 : 12} 
              tick={{ fill: '#FFFFFF' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)" 
              fontSize={isMobile ? 10 : 12} 
              tickFormatter={(value) => `R$${value}`}
              tick={{ fill: '#FFFFFF' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#FFFFFF' }}
              formatter={(value) => [`R$ ${value}`, '']} 
            />
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              activeDot={{ r: 8, fill: "#8B5CF6", stroke: "#FFFFFF", strokeWidth: 2 }} 
              dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="despesa" 
              stroke="#FF6B6B" 
              strokeWidth={3}
              activeDot={{ r: 8, fill: "#FF6B6B", stroke: "#FFFFFF", strokeWidth: 2 }}
              dot={{ r: 4, fill: "#FF6B6B", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ReceitasDespesasChart;
