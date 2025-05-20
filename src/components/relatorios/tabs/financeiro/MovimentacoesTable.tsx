
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { receitasDespesas, formatCurrency } from './financeiro-utils';

const MovimentacoesTable: React.FC = () => {
  return (
    <Card className="p-4 shadow-lg bg-acai-800/50 backdrop-blur-xl border border-acai-700/30">
      <h3 className="text-base md:text-lg font-bold mb-3 text-white">Últimas Movimentações</h3>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-acai-700 scrollbar-track-acai-900">
        <Table>
          <TableHeader>
            <TableRow className="border-acai-700/50">
              <TableHead className="text-white/90">Data</TableHead>
              <TableHead className="text-white/90">Descrição</TableHead>
              <TableHead className="text-right text-white/90">Receita</TableHead>
              <TableHead className="text-right text-white/90">Despesa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receitasDespesas.map((item, index) => (
              <TableRow 
                key={index} 
                className="border-acai-700/30 hover:bg-acai-700/20 transition-colors"
              >
                <TableCell className="text-white/80 font-medium">{item.data}</TableCell>
                <TableCell className="text-white/80">
                  {index % 2 === 0 ? 'Vendas do dia' : 'Pagamento de insumos'}
                </TableCell>
                <TableCell className="text-right font-mono text-green-300/90">
                  {index % 2 === 0 ? formatCurrency(item.receita) : '-'}
                </TableCell>
                <TableCell className="text-right font-mono text-red-300/90">
                  {index % 2 === 1 ? formatCurrency(item.despesa) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default MovimentacoesTable;
