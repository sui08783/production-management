import type { Order } from "../types/Order";
import { useLoadOrders } from "@/features/orderList/hooks/useLoadOrders";

export const ApiFetch = () => {
  const { orders } = useLoadOrders();

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
