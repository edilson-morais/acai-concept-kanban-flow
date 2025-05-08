
import React from "react";
import { Order } from "../types";

interface OrderCardProps {
  order: Order;
  borderColor: string;
  showMoveButton?: boolean;
  onMove?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  borderColor,
  showMoveButton = true,
  onMove,
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
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="white" strokeWidth="2" fill="none">
              <path d="M20 6L9 17L4 12"></path>
            </svg>
          </div>
          <span className="text-xs text-acai-300">{order.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-acai-400">
          {order.time} - #{order.id}
        </span>
        {showMoveButton && onMove && (
          <button
            onClick={onMove}
            className="text-xs bg-acai-600 bg-opacity-60 hover:bg-opacity-80 rounded-full px-3 py-1 text-white transition-all"
          >
            Mover →
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
