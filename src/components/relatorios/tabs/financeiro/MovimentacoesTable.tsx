
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { receitasDespesas, formatCurrency } from './financeiro-utils';

const MovimentacoesTable: React.FC = () => {
  return (
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
  );
};

export default MovimentacoesTable;
