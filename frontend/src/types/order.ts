import type { OrderStatus } from "./OrderStatus";

export type Order = {
  id: number;
  productName: string;
  machineName: string;
  status: OrderStatus;
  days: string;
  position: string;
  deadline: string;
  quantity: number;
  createDay: string;
};
