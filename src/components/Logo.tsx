
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col mb-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-acai-900 border-2 border-gold flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-acai-900 border border-acai-500 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black relative overflow-hidden">
              <div className="absolute left-[10%] top-0 w-1 h-full bg-acai-400 opacity-60 rounded-full"></div>
            </div>
          </div>
          {/* Green leaf elements */}
          <div className="absolute top-5 left-8 w-5 h-2 bg-green-500 rounded-full -rotate-45"></div>
          <div className="absolute top-4 left-10 w-4 h-2 bg-green-500 rounded-full rotate-12"></div>
          <div className="absolute top-5 right-9 w-4 h-2 bg-green-500 rounded-full rotate-45"></div>
        </div>
      </div>
      <span className="font-bold text-xs mt-1 tracking-wider">AÇAÍ CONCEPT</span>
    </div>
  );
};

export default Logo;
