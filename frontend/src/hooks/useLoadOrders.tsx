import type { Order } from "@/types/api";
import { useEffect, useState } from "react";

export const useLoadOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);



  const loadOrders = async () => {
    const res = await fetch("http://localhost:8080/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return { orders,setOrders, loadOrders };
};
