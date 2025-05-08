
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-acai-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-acai-200 mb-4">Oops! Página não encontrada</p>
        <a href="/" className="text-acai-400 hover:text-acai-300 underline">
          Retornar ao Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
