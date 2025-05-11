
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
    <div className="lg:col-span-2 bg-acai-800 bg-opacity-30 rounded-md p-3 md:p-5">
      <h3 className="text-base md:text-lg font-bold mb-3">Vendas por Dia</h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="data" 
              stroke="rgba(255, 255, 255, 0.5)" 
              fontSize={isMobile ? 10 : 12} 
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.5)" 
              fontSize={isMobile ? 10 : 12} 
              tickFormatter={(value) => `R$${value}`} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333' }}
              formatter={(value) => [`R$ ${value}`, 'Valor']} 
            />
            <Bar dataKey="valor" fill="#7B2CBF" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailySalesChart;
