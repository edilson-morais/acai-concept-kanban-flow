
import React from "react";
import ChartPanel from "../ChartPanel";

interface MessagingRatesChartProps {
  hourlyData: { time: string; orders: number }[];
  topSellingItems: { name: string; count: number }[];
}

const MessagingRatesChart: React.FC<MessagingRatesChartProps> = ({ hourlyData, topSellingItems }) => {
  return (
    <div className="bg-[#0d0d0d] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#060606] p-3 border-b border-gray-800">
        <h2 className="text-white text-lg font-medium">Maiores Taxas de Envio de Mensagens</h2>
      </div>
      <div className="p-4 h-64">
        <ChartPanel 
          hourlyData={hourlyData} 
          topSellingItems={topSellingItems} 
        />
      </div>
    </div>
  );
};

export default MessagingRatesChart;
