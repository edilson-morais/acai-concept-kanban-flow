
import React from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Dados mockados para o financeiro
const receitasDespesas = [
  { data: '01/05', receita: 1500, despesa: 800 },
  { data: '02/05', receita: 1700, despesa: 750 },
  { data: '03/05', receita: 2100, despesa: 900 },
  { data: '04/05', receita: 1200, despesa: 850 },
  { data: '05/05', receita: 2300, despesa: 950 },
  { data: '06/05', receita: 2500, despesa: 1000 },
  { data: '07/05', receita: 1800, despesa: 800 },
  { data: '08/05', receita: 2000, despesa: 850 },
];

// Cores mais vibrantes para o gráfico de distribuição
const distribuicaoDespesas = [
  { categoria: 'Insumos', valor: 45, color: '#8B5CF6' },
  { categoria: 'Funcionários', valor: 25, color: '#7B2CBF' },
  { categoria: 'Aluguel', valor: 15, color: '#6E59A5' },
  { categoria: 'Marketing', valor: 10, color: '#C77DFF' },
  { categoria: 'Outros', valor: 5, color: '#D6BCFA' },
];

// Cores mais vibrantes para o gráfico
const COLORS = ['#8B5CF6', '#7B2CBF', '#6E59A5', '#C77DFF', '#D6BCFA'];

// Função para formatar valores monetários no estilo brasileiro
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

const FinanceiroTab: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Calcular o lucro total do período
  const totalReceitas = receitasDespesas.reduce((sum, item) => sum + item.receita, 0);
  const totalDespesas = receitasDespesas.reduce((sum, item) => sum + item.despesa, 0);
  const lucroTotal = totalReceitas - totalDespesas;
  
  return (
    <div className="space-y-5 mt-4">
      {/* Cards de resumo financeiro */}
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
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Receitas e Despesas */}
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
        
        {/* Gráfico de Distribuição de Despesas com visual melhorado */}
        <Card className="bg-acai-900 bg-opacity-70 p-4 shadow-lg backdrop-blur-sm border border-acai-700">
          <h3 className="text-base md:text-lg font-bold mb-4 text-white">Distribuição de Despesas</h3>
          <div className="h-64 mt-2 pb-6"> {/* Reduced padding-bottom from pb-8 to pb-6 */}
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
                  cy="40%" /* Changed from 45% to 40% to move chart higher */
                  innerRadius={isMobile ? 55 : 75}
                  outerRadius={isMobile ? 85 : 105}
                  paddingAngle={4}
                  dataKey="valor"
                  labelLine={false}
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
                        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}
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
                      stroke="#10002b" 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<ChartTooltipContent />}
                />
              </PieChart>
            </ChartContainer>
          </div>
          
          {/* Legenda melhorada com estilo de pílula - reduced height */}
          <div className="flex flex-wrap justify-center gap-2"> {/* Changed gap-3 to gap-2 and removed mt-2 */}
            {distribuicaoDespesas.map((entry, index) => (
              <div 
                key={index} 
                className="flex items-center text-xs rounded-full bg-acai-800 px-2.5 py-1 shadow-md border border-acai-700" 
                /* Reduced py-1.5 to py-1 and px-3 to px-2.5 to make pills smaller */
              >
                <div 
                  className="w-3 h-3 mr-1.5 rounded-full shadow-inner" 
                  /* Reduced w-3.5 h-3.5 to w-3 h-3 and mr-2 to mr-1.5 */
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="whitespace-nowrap text-white font-medium">{entry.categoria} ({entry.valor}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Tabela de movimentações financeiras */}
      <Card className="p-4 shadow-lg bg-acai-800 bg-opacity-30 backdrop-blur-sm border border-acai-700">
        <h3 className="text-base md:text-lg font-bold mb-3 text-white">Últimas Movimentações</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Data</TableHead>
                <TableHead className="text-white">Descrição</TableHead>
                <TableHead className="text-right text-white">Receita</TableHead>
                <TableHead className="text-right text-white">Despesa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receitasDespesas.map((item, index) => (
                <TableRow key={index} className="border-acai-700">
                  <TableCell className="text-white">{item.data}</TableCell>
                  <TableCell className="text-white">
                    {index % 2 === 0 ? 'Vendas do dia' : 'Pagamento de insumos'}
                  </TableCell>
                  <TableCell className="text-right text-green-300">
                    {index % 2 === 0 ? formatCurrency(item.receita) : '-'}
                  </TableCell>
                  <TableCell className="text-right text-red-300">
                    {index % 2 === 1 ? formatCurrency(item.despesa) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default FinanceiroTab;
