
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
  
  // Blue color scheme based on reference image
  const blueColors = ['#1EAEDB', '#33C3F0', '#0FA0CE', '#403E43', '#8EDCF7'];
  
  return (
    <div className="bg-acai-800/50 backdrop-blur-sm rounded-md p-3 md:p-5 border border-acai-700/30 shadow-lg">
      <h3 className="text-base md:text-lg font-bold mb-3 text-gradient">Vendas por Hora</h3>
      <div className="h-64 md:h-80 relative">
        {/* Add subtle glow effects */}
        <div className="absolute inset-0 bg-acai-500/5 rounded-full blur-3xl"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 45 : 65}
              outerRadius={isMobile ? 85 : 105}
              paddingAngle={4}
              dataKey="valor"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              stroke="#00000033"
              strokeWidth={1.5}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={blueColors[index % blueColors.length]} 
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.35))' }}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Porcentagem']} 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.85)', 
                borderColor: '#333',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(12px)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap justify-center mt-3 gap-3">
        {data.map((entry, index) => (
          <div 
            key={index} 
            className="flex items-center text-xs bg-acai-800/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-acai-600/30 shadow-md"
          >
            <div 
              className="w-3 h-3 mr-1.5 rounded-full shadow-inner" 
              style={{ 
                backgroundColor: blueColors[index % blueColors.length],
                boxShadow: `0 0 8px ${blueColors[index % blueColors.length]}80` 
              }}
            ></div>
            <span className="whitespace-nowrap">{entry.nome} ({entry.valor}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlySalesChart;
