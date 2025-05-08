
import React from "react";
import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 bg-acai-900 flex items-center justify-between px-8 border-b border-acai-800">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full h-10 bg-acai-800 rounded-full pl-10 pr-4 text-acai-100 placeholder-acai-400 focus:outline-none focus:ring-2 focus:ring-acai-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-acai-400" size={18} />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button className="h-8 w-8 bg-acai-500 rounded-md flex items-center justify-center">
            <Bell size={18} className="text-white" />
          </button>
          <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-acai-300 text-xs flex items-center justify-center text-black font-bold">
            4
          </div>
        </div>

        <div className="flex items-center bg-acai-800 px-4 py-1 rounded-full">
          <div className="w-7 h-7 rounded-full bg-acai-500 mr-3"></div>
          <span className="text-acai-100">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
