
import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  gradient: string;
  isCurrency?: boolean;
}

const formatCurrency = (value: number | string): string => {
  // Convert to number if it's a string containing a number
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  
  // Check if it's a valid number
  if (isNaN(numericValue)) return value.toString();
  
  // Format as Brazilian currency: R$ 1.234,56
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

const StatCard: React.FC<StatCardProps> = ({ title, value, gradient, isCurrency = false }) => {
  const displayValue = isCurrency ? formatCurrency(value) : value;
  
  return (
    <div className={`rounded-lg p-5 ${gradient} shadow-lg`}>
      <h3 className="text-sm font-medium text-white mb-5">{title}</h3>
      <p className="text-3xl font-bold text-white">{displayValue}</p>
    </div>
  );
};

export default StatCard;
