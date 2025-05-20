
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface DailySalesChartProps {
  data: Array<{
    data: string;
    valor: number;
  }>;
}

const DailySalesChart: React.FC<DailySalesChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="lg:col-span-2 bg-acai-800/50 backdrop-blur-sm rounded-md p-3 md:p-5 border border-acai-700/30 shadow-lg">
      <h3 className="text-base md:text-lg font-bold mb-3 text-gradient">Vendas por Dia</h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
                backdropFilter: 'blur(12px)'
              }}
              formatter={(value) => [`R$ ${value}`, 'Valor']}
              cursor={{ fill: 'rgba(123, 44, 191, 0.2)' }}
            />
            <Bar 
              dataKey="valor" 
              fill="url(#barGradient)" 
              radius={[6, 6, 0, 0]} 
              style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7B2CBF" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailySalesChart;
