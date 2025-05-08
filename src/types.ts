
export interface Order {
  id: string;
  customerName: string;
  items: string[];
  phone: string;
  time: string;
  status: 'new' | 'preparing' | 'ready' | 'completed';
}
