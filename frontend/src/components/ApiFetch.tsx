import { useEffect, useState } from "react";
import type { Order } from "../types/api";

export const ApiFetch = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <ul>
        {orders.map((order: Order) => (
          <li key={order.id}>
            <div>id: {order.id}</div>
            <div>商品名: {order.productName}</div>
            <div>機械名: {order.machineName}</div>
            <div>納期: {order.deadline}</div>
            <div>数量: {order.quantity}</div>
            <div>作成日: {order.createDay}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
