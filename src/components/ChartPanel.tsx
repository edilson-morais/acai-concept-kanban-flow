
import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

interface ChartPanelProps {
  hourlyData: { time: string; orders: number }[];
  topSellingItems: { name: string; count: number }[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({ hourlyData, topSellingItems }) => {
  // Dados de exemplo para o pie chart
  const data = [
    { name: 'Campanha 1', value: 30 },
    { name: 'Campanha 2', value: 25 },
    { name: 'Campanha 3', value: 20 },
    { name: 'Campanha 4', value: 15 },
    { name: 'Campanha 5', value: 10 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} contentStyle={{backgroundColor: '#111', borderColor: '#333'}} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPanel;
