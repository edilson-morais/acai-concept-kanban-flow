
import React from "react";
import { Order } from "../types";
import { Button } from "./ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface OrderCardProps {
  order: Order;
  borderColor: string;
  showMoveButton?: boolean;
  showBackButton?: boolean;
  onMove?: () => void;
  onMoveBack?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  borderColor,
  showMoveButton = true,
  showBackButton = false,
  onMove,
  onMoveBack,
}) => {
  return (
    <div className={`bg-acai-900 rounded-md p-4 border-t-4 ${borderColor} animate-fade-in shadow-md`}>
      <div className="mb-3">
        <h3 className="font-bold text-base text-acai-50">{order.customerName}</h3>
        {order.items.map((item, idx) => (
          <p key={idx} className="text-xs text-acai-200">
            {item}
          </p>
        ))}
      </div>

      <div className="flex items-center mt-3">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/309e28ab-5886-4434-bf52-d2045d8d03f6.png" 
            alt="WhatsApp" 
            className="w-5 h-5 mr-2" 
          />
          <span className="text-xs text-acai-300">{order.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-acai-400">
          {order.time} - #{order.id.substring(0, 5)}
        </span>
        <div className="flex space-x-2">
          {showBackButton && onMoveBack && (
            <button
              onClick={onMoveBack}
              className="text-xs bg-acai-700 bg-opacity-60 hover:bg-opacity-80 rounded-full px-3 py-1 text-white transition-all flex items-center"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Voltar
            </button>
          )}
          {showMoveButton && onMove && (
            <button
              onClick={onMove}
              className="text-xs bg-acai-600 bg-opacity-60 hover:bg-opacity-80 rounded-full px-3 py-1 text-white transition-all flex items-center"
            >
              Mover
              <ChevronRight className="w-3 h-3 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
