
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface ChartPanelProps {
  hourlyData: { time: string; orders: number }[];
  topSellingItems: { name: string; count: number }[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({ hourlyData, topSellingItems }) => {
  return (
    <div className="flex flex-col bg-acai-900 rounded-lg p-4 h-full">
      <h3 className="text-base font-bold mb-4 text-center text-white">Pedidos por Hora</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <XAxis dataKey="time" tick={{ fill: '#888', fontSize: 10 }} />
            <YAxis tick={{ fill: '#888', fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Bar dataKey="orders" fill="#9D4EDD" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-base font-bold mt-6 mb-4 text-center text-white">Mais Vendidos</h3>
      <div className="space-y-3 mt-2">
        {topSellingItems.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="h-5 w-full bg-acai-800 rounded-sm">
              <div
                className="h-5 bg-acai-500 bg-opacity-50 rounded-sm"
                style={{ width: `${Math.min(100, (item.count / topSellingItems[0].count) * 100)}%` }}
              ></div>
            </div>
            <div className="absolute left-2 top-0 text-xs text-white h-5 flex items-center">
              {item.name} ({item.count})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartPanel;
