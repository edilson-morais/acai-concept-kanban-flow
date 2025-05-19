
import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  gradient: string;
  isCurrency?: boolean;
  change?: string;
  isPositive?: boolean;
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

const StatCard: React.FC<StatCardProps> = ({ title, value, gradient, isCurrency = false, change, isPositive }) => {
  const displayValue = isCurrency ? formatCurrency(value) : value;
  
  return (
    <div className={`rounded-md p-4 ${gradient}`}>
      <div className="flex flex-col">
        <h3 className="text-xs font-medium text-gray-400 mb-2">{title}</h3>
        <p className="text-xl font-semibold text-white mb-1">{displayValue}</p>
        {change && (
          <div className={`text-xs font-medium ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
            <span>{isPositive ? '↑' : '↓'}</span>
            <span className="ml-1">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
