
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { CalendarDays, Download, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dados mockados para os gráficos
const vendasPorDia = [
  { data: '01/05', valor: 1000 },
  { data: '02/05', valor: 1300 },
  { data: '03/05', valor: 1600 },
  { data: '04/05', valor: 700 },
  { data: '05/05', valor: 1900 },
  { data: '06/05', valor: 2200 },
  { data: '07/05', valor: 1450 },
  { data: '08/05', valor: 1750 },
];

const vendasPorHora = [
  { nome: '10h-13h', valor: 25, color: '#7B2CBF' },
  { nome: '13h-16h', valor: 30, color: '#9D4EDD' },
  { nome: '16h-19h', valor: 22, color: '#5A189A' },
  { nome: '19h-22h', valor: 15, color: '#3C096C' },
  { nome: 'Outros', valor: 8, color: '#240046' },
];

// Cores para o gráfico de pizza
const COLORS = ['#7B2CBF', '#9D4EDD', '#5A189A', '#3C096C', '#240046'];

const Relatorios = () => {
  const isMobile = useIsMobile();
  const [dataInicial, setDataInicial] = useState('2025-05-01');
  const [dataFinal, setDataFinal] = useState('2025-05-08');
  const [tabAtiva, setTabAtiva] = useState('vendas');

  return (
    <div className="flex h-screen bg-acai-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <div className="flex flex-col gap-3 md:gap-5">
            {/* Título da página e controles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 md:mb-4">
              <h1 className="text-xl md:text-2xl font-bold">Relatórios</h1>
              
              <div className="flex mt-2 md:mt-0 items-center bg-acai-800 bg-opacity-50 px-2 py-1 rounded-md">
                <div className="bg-acai-700 bg-opacity-50 px-2 py-1 rounded-md text-xs md:text-sm flex items-center mr-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="mr-1">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span>Acesso restrito: Administradores</span>
                </div>
                
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                  <Label className="text-xs md:text-sm">Período:</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="date" 
                      value={dataInicial} 
                      onChange={(e) => setDataInicial(e.target.value)}
                      className="bg-acai-800 border-acai-700 h-8 md:h-9 w-28 md:w-32 text-xs md:text-sm"
                    />
                    <span className="text-xs md:text-sm">até</span>
                    <Input 
                      type="date" 
                      value={dataFinal} 
                      onChange={(e) => setDataFinal(e.target.value)}
                      className="bg-acai-800 border-acai-700 h-8 md:h-9 w-28 md:w-32 text-xs md:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs de navegação */}
            <div className="bg-acai-800 bg-opacity-50 rounded-md p-1 flex overflow-x-auto">
              <Button
                variant={tabAtiva === 'vendas' ? 'default' : 'ghost'}
                className={`flex-1 ${tabAtiva === 'vendas' ? 'bg-acai-500' : ''}`}
                onClick={() => setTabAtiva('vendas')}
              >
                Vendas
              </Button>
              <Button
                variant={tabAtiva === 'produtos' ? 'default' : 'ghost'}
                className={`flex-1 ${tabAtiva === 'produtos' ? 'bg-acai-500' : ''}`}
                onClick={() => setTabAtiva('produtos')}
              >
                Produtos
              </Button>
              <Button
                variant={tabAtiva === 'clientes' ? 'default' : 'ghost'}
                className={`flex-1 ${tabAtiva === 'clientes' ? 'bg-acai-500' : ''}`}
                onClick={() => setTabAtiva('clientes')}
              >
                Clientes
              </Button>
              <Button
                variant={tabAtiva === 'financeiro' ? 'default' : 'ghost'}
                className={`flex-1 ${tabAtiva === 'financeiro' ? 'bg-acai-500' : ''}`}
                onClick={() => setTabAtiva('financeiro')}
              >
                Financeiro
              </Button>
            </div>
            
            {/* Cards de resumo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 my-3">
              <Card className="bg-gradient-to-r from-acai-500 to-acai-600">
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-medium">Total de Vendas</h3>
                  <p className="text-xl md:text-2xl font-bold mt-3">R$ 9.780,00</p>
                  <p className="text-sm flex items-center mt-2 text-green-300">
                    <ArrowUp className="h-4 w-4 mr-1" /> 12% vs período anterior
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-r from-acai-700 to-acai-800">
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-medium">Ticket Médio</h3>
                  <p className="text-xl md:text-2xl font-bold mt-3">R$ 32,60</p>
                  <p className="text-sm flex items-center mt-2 text-green-300">
                    <ArrowUp className="h-4 w-4 mr-1" /> 4% vs período anterior
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-r from-acai-600 to-acai-500">
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-medium">Quantidade de Pedidos</h3>
                  <p className="text-xl md:text-2xl font-bold mt-3">300</p>
                  <p className="text-sm flex items-center mt-2 text-green-300">
                    <ArrowUp className="h-4 w-4 mr-1" /> 8% vs período anterior
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-r from-acai-400 to-acai-300">
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-medium">Vendas do Dia</h3>
                  <p className="text-xl md:text-2xl font-bold mt-3">R$ 1.450,00</p>
                  <p className="text-sm flex items-center mt-2 text-red-300">
                    <ArrowDown className="h-4 w-4 mr-1" /> 3% vs ontem
                  </p>
                </div>
              </Card>
            </div>
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
              <div className="lg:col-span-2 bg-acai-800 bg-opacity-30 rounded-md p-3 md:p-5">
                <h3 className="text-base md:text-lg font-bold mb-3">Vendas por Dia</h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vendasPorDia}
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
              
              <div className="bg-acai-800 bg-opacity-30 rounded-md p-3 md:p-5">
                <h3 className="text-base md:text-lg font-bold mb-3">Vendas por Hora</h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vendasPorHora}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 40 : 60}
                        outerRadius={isMobile ? 80 : 100}
                        paddingAngle={2}
                        dataKey="valor"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {vendasPorHora.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  {vendasPorHora.map((entry, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <div 
                        className="w-3 h-3 mr-1" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span>{entry.nome} ({entry.valor}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Opções de exportação */}
            <Card className="mt-4">
              <div className="p-4">
                <h3 className="text-base md:text-lg font-bold mb-3">Exportar Relatório</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" className="bg-acai-500 hover:bg-acai-600">
                    <FileText className="mr-1 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Excel
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
