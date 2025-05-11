
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from 'lucide-react';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  disponivel: boolean;
  categoria: string;
  imagem?: string;
};

const ProdutosConfig: React.FC = () => {
  const [produtos] = useState<Produto[]>([
    { id: 1, nome: "Açaí 300ml", preco: 15.9, disponivel: true, categoria: "Açaí" },
    { id: 2, nome: "Açaí 500ml", preco: 19.9, disponivel: true, categoria: "Açaí" },
    { id: 3, nome: "Açaí com Banana 300ml", preco: 17.9, disponivel: true, categoria: "Açaí Especial" },
    { id: 4, nome: "Açaí com Morango 300ml", preco: 18.9, disponivel: false, categoria: "Açaí Especial" },
  ]);

  const formatarPreco = (preco: number): string => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  return (
    <div className="mt-4">
      <Tabs defaultValue="produtos">
        <TabsList className="bg-acai-700 bg-opacity-30">
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="complementos">Complementos</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-full max-w-md">
              <input 
                type="text" 
                placeholder="Buscar produtos..."
                className="w-full px-3 py-2 bg-acai-700 bg-opacity-20 rounded-md border border-acai-600 focus:outline-none focus:ring-2 focus:ring-acai-500"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Adicionar Produto
            </Button>
          </div>

          <div className="bg-acai-800 bg-opacity-40 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 font-semibold text-acai-100 border-b border-acai-700">
              <div className="col-span-5">Nome do Produto</div>
              <div className="col-span-2">Preço</div>
              <div className="col-span-3">Disponibilidade</div>
              <div className="col-span-2">Ações</div>
            </div>

            {produtos.map((produto) => (
              <div key={produto.id} className="grid grid-cols-12 gap-2 p-3 border-b border-acai-700 hover:bg-acai-800 hover:bg-opacity-20 transition-colors">
                <div className="col-span-5 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-primary mr-3"></div>
                  {produto.nome}
                </div>
                <div className="col-span-2">{formatarPreco(produto.preco)}</div>
                <div className="col-span-3 flex items-center">
                  <div className={`w-3 h-3 rounded-full ${produto.disponivel ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <span>{produto.disponivel ? 'Disponível' : 'Indisponível'}</span>
                </div>
                <div className="col-span-2 flex space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Edit2 size={14} />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 px-2">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorias">
          <div className="p-4 mt-4 bg-acai-800 bg-opacity-40 rounded-md">
            <p className="text-gray-400">Configurações de categorias de produtos</p>
          </div>
        </TabsContent>

        <TabsContent value="complementos">
          <div className="p-4 mt-4 bg-acai-800 bg-opacity-40 rounded-md">
            <p className="text-gray-400">Configurações de complementos para produtos</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProdutosConfig;
