
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileSearch, Settings, Lock, BarChart3, Home, Users, DollarSign } from "lucide-react";
import Logo from "./Logo";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/",
      active: location.pathname === "/",
      restricted: false
    },
    {
      title: "Pedidos",
      icon: <FileSearch size={18} />,
      path: "/pedidos",
      active: location.pathname === "/pedidos",
      restricted: false
    },
    {
      title: "Campanhas",
      icon: <BarChart3 size={18} />,
      path: "/campanhas",
      active: location.pathname === "/campanhas",
      restricted: false
    },
    {
      title: "Leads",
      icon: <Users size={18} />,
      path: "/leads",
      active: location.pathname === "/leads",
      restricted: false
    },
    {
      title: "Investimento",
      icon: <DollarSign size={18} />,
      path: "/investimento",
      active: location.pathname === "/investimento",
      restricted: false
    },
    {
      title: "Relatórios",
      icon: <FileSearch size={18} />,
      path: "/relatorios",
      active: location.pathname === "/relatorios",
      restricted: true
    },
    {
      title: "Configurações",
      icon: <Settings size={18} />,
      path: "/configuracoes",
      active: location.pathname === "/configuracoes",
      restricted: true
    },
  ];

  return (
    <div className="h-screen w-16 md:w-56 bg-[#060606] flex flex-col border-r border-gray-800">
      <div className="mt-4 mb-6 flex justify-center md:justify-start md:px-4">
        <Logo />
      </div>
      <nav className="px-2 md:px-4 flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center rounded-md px-2 md:px-3 h-10 mb-1 relative
              ${item.active ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-[#111] text-gray-400 hover:text-gray-200'}`}
          >
            <span className="mr-0 md:mr-2">{item.icon}</span>
            <span className="hidden md:inline text-sm">{item.title}</span>
            {item.restricted && (
              <div className="absolute right-1 w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                <Lock size={10} className="text-gray-400" />
              </div>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-2 md:p-4 border-t border-gray-800">
        <div className="flex items-center justify-center md:justify-start">
          <div className="w-6 h-6 rounded-full bg-blue-600"></div>
          <div className="hidden md:block ml-2">
            <div className="text-xs text-gray-300">Meta Ads</div>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
