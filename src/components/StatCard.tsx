
import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, gradient }) => {
  return (
    <div className={`rounded-lg p-5 ${gradient} shadow-lg`}>
      <h3 className="text-sm font-medium text-white mb-5">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
