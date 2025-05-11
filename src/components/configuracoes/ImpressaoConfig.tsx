
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, TestTube, Save } from 'lucide-react';

const ImpressaoConfig: React.FC = () => {
  const [impressoraAtiva, setImpressoraAtiva] = useState(true);
  const [impressoraConectada, setImpressoraConectada] = useState(true);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <Card className="bg-acai-800 bg-opacity-40 border-acai-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Printer className="mr-2" size={20} />
            Configuração de Impressora
          </CardTitle>
          <CardDescription>
            Configure a impressora para comprovantes e comandas de cozinha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="impressora-ativa">Impressora ativa</Label>
              <Switch 
                id="impressora-ativa" 
                checked={impressoraAtiva} 
                onCheckedChange={setImpressoraAtiva} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modelo-impressora">Modelo da impressora</Label>
              <Select defaultValue="termica80mm">
                <SelectTrigger id="modelo-impressora">
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="termica80mm">Térmica 80mm</SelectItem>
                  <SelectItem value="termica58mm">Térmica 58mm</SelectItem>
                  <SelectItem value="matricial">Matricial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="porta-impressora">Porta de conexão</Label>
              <Select defaultValue="usb">
                <SelectTrigger id="porta-impressora">
                  <SelectValue placeholder="Selecione uma porta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usb">USB</SelectItem>
                  <SelectItem value="serial">Serial</SelectItem>
                  <SelectItem value="rede">Rede</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${impressoraConectada ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">{impressoraConectada ? 'Impressora conectada' : 'Impressora desconectada'}</span>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <TestTube size={16} className="mr-1.5" />
                Imprimir teste
              </Button>
              <Button size="sm" className="flex items-center">
                <Save size={16} className="mr-1.5" />
                Salvar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-acai-800 bg-opacity-40 border-acai-700">
        <CardHeader>
          <CardTitle>Layout de Impressão</CardTitle>
          <CardDescription>
            Configure o layout dos comprovantes impressos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="logo-impressao">Imprimir logo</Label>
              <Switch id="logo-impressao" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="endereco-impressao">Imprimir endereço</Label>
              <Switch id="endereco-impressao" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="telefone-impressao">Imprimir telefone</Label>
              <Switch id="telefone-impressao" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="qrcode-impressao">Imprimir QR Code</Label>
              <Switch id="qrcode-impressao" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mensagem-rodape">Mensagem de rodapé</Label>
              <textarea 
                id="mensagem-rodape"
                className="w-full h-20 px-3 py-2 bg-acai-700 bg-opacity-20 rounded-md border border-acai-600 focus:outline-none focus:ring-2 focus:ring-acai-500 resize-none"
                defaultValue="Obrigado pela preferência! Volte sempre ao Açaí Concept!"
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button size="sm" className="flex items-center">
                <Save size={16} className="mr-1.5" />
                Salvar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpressaoConfig;
