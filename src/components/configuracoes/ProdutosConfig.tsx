
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type Produto = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: string;
  description?: string;
};

type Categoria = {
  id: string;
  name: string;
  description?: string;
  is_premium: boolean;
  has_extra_cost: boolean;
  unlimited: boolean;
};

// Dados de exemplo para produtos
const exemploProdutos: Produto[] = [
  {
    id: '1',
    name: 'Açaí 300ml',
    price: 12.90,
    available: true,
    category: 'Açaí Tradicional'
  },
  {
    id: '2',
    name: 'Açaí 500ml',
    price: 17.90,
    available: true,
    category: 'Açaí Tradicional'
  },
  {
    id: '3',
    name: 'Açaí 700ml', 
    price: 22.90,
    available: true,
    category: 'Açaí Tradicional'
  },
  {
    id: '4',
    name: 'Mix Berry 500ml',
    price: 19.90,
    available: false,
    category: 'Especiais'
  }
];

// Dados de exemplo para categorias
const exemploCategorias: Categoria[] = [
  {
    id: '1',
    name: 'Açaí Tradicional',
    description: 'Açaí puro tradicional em diferentes tamanhos',
    is_premium: false,
    has_extra_cost: false,
    unlimited: true
  },
  {
    id: '2',
    name: 'Especiais',
    description: 'Misturas e sabores especiais',
    is_premium: true,
    has_extra_cost: true,
    unlimited: false
  },
  {
    id: '3',
    name: 'Complementos',
    description: 'Adicionais para o açaí',
    is_premium: false,
    has_extra_cost: true,
    unlimited: false
  }
];

const ProdutosConfig: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        
        // Verificar se as tabelas existem no Supabase
        let hasProductsTable = false;
        let hasCategoriesTable = false;
        
        try {
          // Tentamos verificar se podemos obter dados de uma tabela existente
          const { data: existingTableData } = await supabase
            .from('adriana_producoes')
            .select('count')
            .limit(1)
            .maybeSingle();
            
          // Vamos considerar que as tabelas não existem ainda
          hasProductsTable = false;
          hasCategoriesTable = false;
        } catch (error) {
          console.log('Erro ao verificar tabelas existentes:', error);
          hasProductsTable = false;
          hasCategoriesTable = false;
        }

        if (!hasProductsTable || !hasCategoriesTable) {
          // Se não encontrar as tabelas necessárias, usar dados de exemplo
          setProdutos(exemploProdutos);
          setCategorias(exemploCategorias);
          setLoading(false);
          console.log('Usando dados de exemplo para produtos e categorias');
          return;
        }
        
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Não foi possível carregar os produtos. Tente novamente.');
        
        // Em caso de erro, use dados de exemplo
        setProdutos(exemploProdutos);
        setCategorias(exemploCategorias);
        
        toast({
          title: "Erro ao carregar dados",
          description: "Usando dados de exemplo por enquanto.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProdutos();
  }, [toast]);

  const formatarPreco = (preco: number): string => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProdutos = produtos.filter(produto => 
    produto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    produto.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduto = () => {
    toast({
      title: "Adicionar Produto",
      description: "Esta funcionalidade será implementada em breve.",
    });
  };

  const handleEditProduto = (id: string) => {
    toast({
      title: "Editar Produto",
      description: `Edição do produto ${id} será implementada em breve.`,
    });
  };

  const handleDeleteProduto = (id: string) => {
    toast({
      title: "Excluir Produto",
      description: `Exclusão do produto ${id} será implementada em breve.`,
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
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
            <div className="w-full md:max-w-md">
              <input 
                type="text" 
                placeholder="Buscar produtos..."
                className="w-full px-3 py-2 bg-acai-700 bg-opacity-20 rounded-md border border-acai-600 focus:outline-none focus:ring-2 focus:ring-acai-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto" onClick={handleAddProduto}>
              <Plus size={16} className="mr-2" />
              Adicionar Produto
            </Button>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-800 p-3 rounded-md mb-4 flex items-center">
              <AlertCircle size={20} className="text-red-400 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-acai-800 bg-opacity-40 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 font-semibold text-acai-100 border-b border-acai-700">
              <div className="col-span-5">Nome do Produto</div>
              <div className="col-span-2">Preço</div>
              <div className="col-span-3">Disponibilidade</div>
              <div className="col-span-2">Ações</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-acai-100">
                Carregando produtos...
              </div>
            ) : filteredProdutos.length === 0 ? (
              <div className="p-8 text-center text-acai-100">
                {searchTerm ? "Nenhum produto encontrado com este termo." : "Nenhum produto cadastrado."}
              </div>
            ) : (
              filteredProdutos.map((produto) => (
                <div key={produto.id} className="grid grid-cols-12 gap-2 p-3 border-b border-acai-700 hover:bg-acai-800 hover:bg-opacity-20 transition-colors">
                  <div className="col-span-5 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary mr-3"></div>
                    {produto.name}
                  </div>
                  <div className="col-span-2">{formatarPreco(produto.price)}</div>
                  <div className="col-span-3 flex items-center">
                    <div className={`w-3 h-3 rounded-full ${produto.available ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                    <span>{produto.available ? 'Disponível' : 'Indisponível'}</span>
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 px-2"
                      onClick={() => handleEditProduto(produto.id)}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="h-8 px-2"
                      onClick={() => handleDeleteProduto(produto.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-acai-100">Categorias de Produtos</h3>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Adicionar Categoria
            </Button>
          </div>
          
          <div className="bg-acai-800 bg-opacity-40 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 font-semibold text-acai-100 border-b border-acai-700">
              <div className="col-span-5">Nome da Categoria</div>
              <div className="col-span-2">Premium</div>
              <div className="col-span-3">Características</div>
              <div className="col-span-2">Ações</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-acai-100">
                Carregando categorias...
              </div>
            ) : categorias.length === 0 ? (
              <div className="p-8 text-center text-acai-100">
                Nenhuma categoria cadastrada.
              </div>
            ) : (
              categorias.map((categoria) => (
                <div key={categoria.id} className="grid grid-cols-12 gap-2 p-3 border-b border-acai-700 hover:bg-acai-800 hover:bg-opacity-20 transition-colors">
                  <div className="col-span-5">{categoria.name}</div>
                  <div className="col-span-2">
                    {categoria.is_premium ? (
                      <span className="px-2 py-1 bg-gold bg-opacity-20 text-gold rounded-full text-xs">Premium</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-700 bg-opacity-20 text-gray-400 rounded-full text-xs">Padrão</span>
                    )}
                  </div>
                  <div className="col-span-3 flex flex-col gap-1">
                    {categoria.unlimited && (
                      <span className="px-2 py-0.5 bg-green-900 bg-opacity-20 text-green-400 rounded-full text-xs inline-block">Ilimitado</span>
                    )}
                    {categoria.has_extra_cost && (
                      <span className="px-2 py-0.5 bg-blue-900 bg-opacity-20 text-blue-400 rounded-full text-xs inline-block">Custo extra</span>
                    )}
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
              ))
            )}
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
