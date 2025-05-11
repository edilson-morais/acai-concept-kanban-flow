
import React from 'react';
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

// Dados mockados para produtos
const produtosMaisVendidos = [
  { nome: 'Açaí 500ml', quantidade: 150, valor: 2250 },
  { nome: 'Açaí 300ml', quantidade: 120, valor: 1440 },
  { nome: 'Açaí com Banana', quantidade: 80, valor: 1040 },
  { nome: 'Açaí com Morango', quantidade: 75, valor: 1125 },
  { nome: 'Açaí com Granola', quantidade: 60, valor: 780 },
];

const categoriasProdutos = [
  { nome: 'Açaí Puro', valor: 42, color: '#7B2CBF' },
  { nome: 'Açaí com Frutas', valor: 28, color: '#9D4EDD' },
  { nome: 'Açaí com Complementos', valor: 18, color: '#5A189A' },
  { nome: 'Milk Shakes', valor: 12, color: '#3C096C' },
];

const COLORS = ['#7B2CBF', '#9D4EDD', '#5A189A', '#3C096C', '#240046'];

const ProdutosTab: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-5 mt-4">
      {/* Tabela de produtos mais vendidos */}
      <Card className="p-4">
        <h3 className="text-base md:text-lg font-bold mb-3">Produtos Mais Vendidos</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosMaisVendidos.map((produto, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell className="text-right">{produto.quantidade}</TableCell>
                  <TableCell className="text-right">R$ {produto.valor.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Categorias */}
        <Card className="bg-acai-800 bg-opacity-30 p-4">
          <h3 className="text-base md:text-lg font-bold mb-3">Vendas por Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriasProdutos}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 80 : 90}
                  paddingAngle={2}
                  dataKey="valor"
                  label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoriasProdutos.map((entry, index) => (
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
        
        {/* Gráfico de Desempenho de Produtos */}
        <Card className="bg-acai-800 bg-opacity-30 p-4">
          <h3 className="text-base md:text-lg font-bold mb-3">Desempenho dos Produtos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={produtosMaisVendidos}
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
                  formatter={(value) => [`${value}`, 'Quantidade']} 
                />
                <Bar dataKey="quantidade" fill="#7B2CBF" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProdutosTab;
