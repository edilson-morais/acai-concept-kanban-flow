
import React from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";
import { receitasDespesas } from './financeiro-utils';

const ReceitasDespesasChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-acai-800/50 p-4 shadow-lg backdrop-blur-xl border border-acai-700/30">
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
              contentStyle={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.85)', 
                borderColor: '#333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(12px)',
                color: '#FFFFFF' 
              }}
              formatter={(value) => [`R$ ${value}`, '']} 
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}
            />
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Line 
              name="Receita" 
              type="monotone" 
              dataKey="receita" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              fillOpacity={0.3}
              fill="url(#colorReceita)"
              activeDot={{ r: 8, fill: "#8B5CF6", stroke: "#FFFFFF", strokeWidth: 2 }} 
              dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 0 }}
            />
            <Line 
              name="Despesa"
              type="monotone" 
              dataKey="despesa" 
              stroke="#FF6B6B" 
              strokeWidth={3}
              fillOpacity={0.3}
              fill="url(#colorDespesa)"
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
