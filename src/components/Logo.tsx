
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col mb-4">
      <div className="relative w-20 h-20">
        <img 
          src="/lovable-uploads/88a93b75-3167-4eaa-b1f5-744e9055819a.png" 
          alt="Açaí Concept Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-bold text-xs mt-1 tracking-wider">AÇAÍ CONCEPT</span>
    </div>
  );
};

export default Logo;
