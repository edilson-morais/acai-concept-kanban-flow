
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, FileSpreadsheet } from "lucide-react";

const ExportOptions: React.FC = () => {
  return (
    <Card className="mt-4">
      <div className="p-4">
        <h3 className="text-base md:text-lg font-bold mb-3">Exportar Relatório</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" className="bg-acai-500 hover:bg-acai-600">
            <FileText className="mr-1 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-1 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline">
            <Download className="mr-1 h-4 w-4" />
            CSV
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExportOptions;
