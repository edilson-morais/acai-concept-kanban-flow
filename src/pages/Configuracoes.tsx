
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Printer, Package } from "lucide-react";
import ProdutosConfig from '../components/configuracoes/ProdutosConfig';
import ImpressaoConfig from '../components/configuracoes/ImpressaoConfig';

const Configuracoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState("produtos");

  return (
    <div className="flex h-screen bg-acai-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-6">
          <div className="flex flex-col gap-3 md:gap-5">
            {/* Título da página e indicador de acesso restrito */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h1 className="text-xl md:text-2xl font-bold">Configurações</h1>
              
              <div className="mt-2 md:mt-0 inline-flex items-center bg-acai-800 px-3 py-1.5 rounded-md text-xs">
                <Lock size={14} className="mr-1.5 text-gold" />
                <span className="text-acai-100">Acesso restrito: Administradores</span>
              </div>
            </div>
            
            {/* Abas de navegação */}
            <div className="bg-acai-800 rounded-md p-3 mb-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[400px]">
                  <TabsTrigger value="produtos" className="flex items-center">
                    <Package size={16} className="mr-2" />
                    <span>Produtos</span>
                  </TabsTrigger>
                  <TabsTrigger value="impressao" className="flex items-center">
                    <Printer size={16} className="mr-2" />
                    <span>Impressão</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="produtos">
                  <ProdutosConfig />
                </TabsContent>
                
                <TabsContent value="impressao">
                  <ImpressaoConfig />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
