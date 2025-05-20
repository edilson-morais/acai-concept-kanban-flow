
import React from 'react';
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { distribuicaoDespesas, COLORS } from './financeiro-utils';

const DistribuicaoDespesasChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-acai-900/70 p-4 shadow-lg backdrop-blur-xl border border-acai-700/30">
      <h3 className="text-base md:text-lg font-bold mb-4 text-white">Distribuição de Despesas</h3>
      <div className="h-64 mt-2 pb-6 relative">
        {/* Add subtle glow effect */}
        <div className="absolute inset-0 bg-acai-500/5 rounded-full blur-3xl"></div>
        
        <ChartContainer
          config={{
            insumos: { color: '#8B5CF6', label: 'Insumos' },
            funcionarios: { color: '#7B2CBF', label: 'Funcionários' },
            aluguel: { color: '#6E59A5', label: 'Aluguel' },
            marketing: { color: '#C77DFF', label: 'Marketing' },
            outros: { color: '#D6BCFA', label: 'Outros' },
          }}
        >
          <PieChart margin={{ top: 0, right: 0, bottom: 25, left: 0 }}>
            <Pie
              data={distribuicaoDespesas}
              cx="50%"
              cy="40%"
              innerRadius={isMobile ? 55 : 75}
              outerRadius={isMobile ? 85 : 105}
              paddingAngle={4}
              dataKey="valor"
              labelLine={false}
              stroke="#10002b30" 
              strokeWidth={2}
              label={({ categoria, valor, x, y }) => {
                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > 200 ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={13}
                    fontWeight={600}
                    style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.7))' }}
                  >
                    {`${categoria} ${valor}%`}
                  </text>
                );
              }}
            >
              {distribuicaoDespesas.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.35))' }}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<ChartTooltipContent />}
            />
          </PieChart>
        </ChartContainer>
      </div>
      
      {/* Legenda com estilo de pílula */}
      <div className="flex flex-wrap justify-center gap-2">
        {distribuicaoDespesas.map((entry, index) => (
          <div 
            key={index} 
            className="flex items-center text-xs rounded-full bg-acai-800/70 backdrop-blur-sm px-3 py-1.5 shadow-lg border border-acai-700/30"
          >
            <div 
              className="w-3 h-3 mr-2 rounded-full shadow-inner" 
              style={{ 
                backgroundColor: COLORS[index % COLORS.length],
                boxShadow: `0 0 8px ${COLORS[index % COLORS.length]}80` 
              }}
            ></div>
            <span className="whitespace-nowrap text-white font-medium">{entry.categoria} ({entry.valor}%)</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DistribuicaoDespesasChart;
