
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
      <Label className="text-xs md:text-sm">Período:</Label>
      <div className="flex items-center space-x-2">
        <Input 
          type="date" 
          value={startDate} 
          onChange={(e) => onStartDateChange(e.target.value)}
          className="bg-acai-800 border-acai-700 h-8 md:h-9 w-28 md:w-32 text-xs md:text-sm"
        />
        <span className="text-xs md:text-sm">até</span>
        <Input 
          type="date" 
          value={endDate} 
          onChange={(e) => onEndDateChange(e.target.value)}
          className="bg-acai-800 border-acai-700 h-8 md:h-9 w-28 md:w-32 text-xs md:text-sm"
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
