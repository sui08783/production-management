import { HStack, Table } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";
import { orderStatus } from "@/constains/orderStatus";
import { DeleteOrderDialog } from "./DeleteOrderDialog";
import { UpdataOrderDialog } from "./UpdateOrderDialog";

type Props = {
  order: Order;
  loadOrders: () => Promise<void>;
};

export const OrderRow = memo((props: Props) => {
  const { order, loadOrders } = props;

  const { updateData, productName, machineName, status, deadline, quantity, setEditingId, setProductName, setMachineName, setStatus, setDeadline, setQuantity } = useUpdateOrder();

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!editingOrder) return;

    setEditingId(editingOrder.id);
    setProductName(editingOrder.productName);
    setMachineName(editingOrder.machineName);
    setStatus(editingOrder.status);
    setDeadline(editingOrder.deadline);
    setQuantity(editingOrder.quantity);
  }, [editingOrder]);

  return (
    <Table.Row key={order.id} _hover={{ bg: "gray.50" }}>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell>{order.productName}</Table.Cell>
      <Table.Cell>{order.machineName}</Table.Cell>
      <Table.Cell>{orderStatus[order.status]}</Table.Cell>
      <Table.Cell>{order.deadline}</Table.Cell>
      <Table.Cell fontWeight="bold">{order.quantity}</Table.Cell>
      <Table.Cell>{order.createDay}</Table.Cell>
      <Table.Cell>
        <HStack gap="2" justify="center">
          {/* 編集用ダイアログ */}
          <UpdataOrderDialog
            order={order}
            loadOrders={loadOrders}
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            updateData={updateData}
            productName={productName}
            machineName={machineName}
            status={status}
            deadline={deadline}
            quantity={quantity}
            setProductName={setProductName}
            setMachineName={setMachineName}
            setStatus={setStatus}
            setDeadline={setDeadline}
            setQuantity={setQuantity}
          />

          {/* 削除用ダイアログ */}
          <DeleteOrderDialog order={order} loadOrders={loadOrders} />
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
});
