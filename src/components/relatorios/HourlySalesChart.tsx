
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface HourlySalesChartProps {
  data: Array<{
    nome: string;
    valor: number;
    color: string;
  }>;
  colors: string[];
}

const HourlySalesChart: React.FC<HourlySalesChartProps> = ({ data, colors }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-acai-800 bg-opacity-30 rounded-md p-3 md:p-5">
      <h3 className="text-base md:text-lg font-bold mb-3">Vendas por Hora</h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 40 : 60}
              outerRadius={isMobile ? 80 : 100}
              paddingAngle={2}
              dataKey="valor"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Porcentagem']} 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap justify-center mt-3 gap-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="w-3 h-3 mr-1" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span>{entry.nome} ({entry.valor}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlySalesChart;
