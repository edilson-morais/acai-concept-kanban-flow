
import React from "react";
import OrderCard from "./OrderCard";
import { Order } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";

interface KanbanColumnProps {
  title: string;
  orders: Order[];
  color: string;
  showMoveButton?: boolean;
  showBackButton?: boolean;
  onMoveOrder?: (id: string) => void;
  onMoveBack?: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  orders,
  color,
  showMoveButton = true,
  showBackButton = false,
  onMoveOrder,
  onMoveBack,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'w-full' : 'w-full min-w-[250px] max-w-xs'}`}>
      <div className={`${color} mb-2 rounded-md py-2 px-3 text-center`}>
        <h3 className="text-xs md:text-sm font-medium text-white">{title}</h3>
      </div>
      <div className="flex-1 bg-acai-800 bg-opacity-20 rounded-md p-2 overflow-y-auto">
        <div className="space-y-2 md:space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              borderColor={color}
              showMoveButton={showMoveButton}
              showBackButton={showBackButton}
              onMove={onMoveOrder ? () => onMoveOrder(order.id) : undefined}
              onMoveBack={onMoveBack ? () => onMoveBack(order.id) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
