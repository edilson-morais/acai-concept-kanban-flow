
import React from "react";
import { Bell, Calendar, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-[#060606] flex items-center justify-between px-4 md:px-6 border-b border-gray-800">
      <div className="relative w-64 md:w-72">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full h-9 bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center text-gray-400 hover:text-white px-2">
          <Calendar size={18} className="mr-1" />
          <span className="text-xs font-medium hidden md:inline">1 de ago - 23 de set 2024</span>
        </button>

        <div className="relative">
          <button className="h-8 w-8 bg-[#111] border border-gray-800 rounded-md flex items-center justify-center">
            <Bell size={18} className="text-gray-400" />
          </button>
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white font-bold">
            4
          </div>
        </div>

        <div className="flex items-center bg-[#111] px-3 py-1 rounded-md border border-gray-800">
          <div className="w-6 h-6 rounded-full bg-blue-600 mr-2"></div>
          <span className="text-gray-300 text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
