
import React from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

// Dados mockados para clientes
const clientesMaisFrequentes = [
  { nome: 'Maria Silva', visitas: 12, valorTotal: 432.50 },
  { nome: 'João Oliveira', visitas: 10, valorTotal: 360.00 },
  { nome: 'Ana Santos', visitas: 9, valorTotal: 310.50 },
  { nome: 'Pedro Costa', visitas: 8, valorTotal: 290.00 },
  { nome: 'Carla Souza', visitas: 7, valorTotal: 245.00 },
];

const faixaEtaria = [
  { faixa: '18-24', valor: 30, color: '#7B2CBF' },
  { faixa: '25-34', valor: 35, color: '#9D4EDD' },
  { faixa: '35-44', valor: 20, color: '#5A189A' },
  { faixa: '45+', valor: 15, color: '#3C096C' },
];

const COLORS = ['#7B2CBF', '#9D4EDD', '#5A189A', '#3C096C', '#240046'];

const ClientesTab: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-5 mt-4">
      {/* Tabela de clientes mais frequentes */}
      <Card className="p-4">
        <h3 className="text-base md:text-lg font-bold mb-3">Clientes Mais Frequentes</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Visitas</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesMaisFrequentes.map((cliente, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell className="text-right">{cliente.visitas}</TableCell>
                  <TableCell className="text-right">R$ {cliente.valorTotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Faixa Etária */}
        <Card className="bg-acai-800 bg-opacity-30 p-4">
          <h3 className="text-base md:text-lg font-bold mb-3">Clientes por Faixa Etária</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={faixaEtaria}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 80 : 90}
                  paddingAngle={2}
                  dataKey="valor"
                  label={({ faixa, percent }) => `${faixa} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {faixaEtaria.map((entry, index) => (
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
        </Card>
        
        {/* Gráfico de Fidelidade */}
        <Card className="bg-acai-800 bg-opacity-30 p-4">
          <h3 className="text-base md:text-lg font-bold mb-3">Frequência de Visitas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientesMaisFrequentes}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="nome" 
                  stroke="rgba(255, 255, 255, 0.5)" 
                  fontSize={isMobile ? 10 : 12} 
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.5)" 
                  fontSize={isMobile ? 10 : 12} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333' }}
                  formatter={(value) => [`${value}`, 'Visitas']} 
                />
                <Bar dataKey="visitas" fill="#9D4EDD" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientesTab;
