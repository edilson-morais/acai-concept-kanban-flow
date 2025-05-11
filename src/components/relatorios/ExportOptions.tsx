
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ExportOptions: React.FC = () => {
  const { toast } = useToast();
  
  const handleExport = (format: string) => {
    toast({
      title: "Exportação iniciada",
      description: `Seu relatório será exportado em formato ${format} em breve.`,
      duration: 3000,
    });
  };
  
  return (
    <Card className="mt-4 shadow-lg bg-acai-800 bg-opacity-30 backdrop-blur-sm border border-acai-700">
      <div className="p-4">
        <h3 className="text-base md:text-lg font-bold mb-3 text-white">Exportar Relatório</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="default" 
            className="bg-acai-500 hover:bg-acai-600 transition-colors shadow-md"
            onClick={() => handleExport('PDF')}
          >
            <FileText className="mr-1 h-4 w-4" />
            PDF
          </Button>
          <Button 
            variant="outline"
            className="border-acai-400 text-white hover:bg-acai-400 hover:text-white transition-colors shadow-md"
            onClick={() => handleExport('Excel')}
          >
            <FileSpreadsheet className="mr-1 h-4 w-4" />
            Excel
          </Button>
          <Button 
            variant="outline"
            className="border-acai-400 text-white hover:bg-acai-400 hover:text-white transition-colors shadow-md"
            onClick={() => handleExport('CSV')}
          >
            <Download className="mr-1 h-4 w-4" />
            CSV
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExportOptions;
