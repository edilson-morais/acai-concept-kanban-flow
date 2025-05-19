
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileSearch, Settings, Lock } from "lucide-react";
import Logo from "./Logo";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
      active: location.pathname === "/",
      restricted: false
    },
    {
      title: "Pedidos",
      icon: <FileSearch size={20} />,
      path: "/pedidos",
      active: location.pathname === "/pedidos",
      restricted: false
    },
    {
      title: "Relatórios",
      icon: <FileSearch size={20} />,
      path: "/relatorios",
      active: location.pathname === "/relatorios",
      restricted: true
    },
    {
      title: "Configurações",
      icon: <Settings size={20} />,
      path: "/configuracoes",
      active: location.pathname === "/configuracoes",
      restricted: true
    },
  ];

  return (
    <div className="h-screen w-56 bg-acai-900 flex flex-col">
      <div className="mt-6 mb-8">
        <Logo />
      </div>
      <nav className="px-4 flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center rounded-md px-3 h-11 mb-2 relative
              ${item.active ? 'bg-acai-700 bg-opacity-60' : 'hover:bg-acai-700 hover:bg-opacity-20'}`}
          >
            <span className="mr-2 text-acai-100">{item.icon}</span>
            <span className="text-acai-100">{item.title}</span>
            {item.restricted && (
              <div className="absolute right-2 w-5 h-5 rounded-full bg-gold bg-opacity-60 flex items-center justify-center">
                <Lock size={12} className="text-acai-900" />
              </div>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
