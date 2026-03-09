import { Button, CloseButton, Dialog, HStack, Portal, Table } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import type { Order } from "@/types/api";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";
import { EditOrderDialog } from "./EditOrderDialog";
import { orderStatus } from "@/constains/orderStatus";

type Props = {
  order: Order;
  loadOrders: () => Promise<void>;
};

export const OrderRow = memo((props: Props) => {
  const { order, loadOrders } = props;

  const { deleteOrder } = useDeleteOrder();

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
          <Dialog.Root size="md">
            <Dialog.Trigger asChild>
              <Button
                size="xs"
                colorPalette="blue"
                onClick={() => {
                  setEditingOrder(order);
                }}
              >
                編集
              </Button>
            </Dialog.Trigger>

            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>注文編集</Dialog.Title>
                  </Dialog.Header>

                  {/* 工程データがあるときに、編集用のダイアログを表示 */}
                  {editingOrder && (
                    <EditOrderDialog
                      order={editingOrder}
                      productName={productName}
                      machineName={machineName}
                      status={orderStatus[order.status]}
                      deadline={deadline}
                      quantity={quantity}
                      setProductName={setProductName}
                      setMachineName={setMachineName}
                      setStatus={setStatus}
                      setDeadline={setDeadline}
                      setQuantity={setQuantity}
                    />
                  )}

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">キャンセル</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      {" "}
                      <Button
                        colorPalette="blue"
                        onClick={async () => {
                          const success = await updateData();

                          if (success) {
                            await loadOrders();
                            toaster.create({
                              description: "更新が成功しました",
                              type: "success",
                              closable: true,
                            });
                          }
                        }}
                      >
                        更新する
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <Dialog.Root key="sm" size="sm">
            <Dialog.Trigger asChild>
              <Button size="xs" colorPalette="red">
                削除
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>工程削除</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>工程を削除しようとしています。 本当に削除しますか？</p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">キャンセル</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      colorPalette="red"
                      onClick={async () => {
                        const success = await deleteOrder(order.id);

                        if (success) {
                          await loadOrders();
                          toaster.create({
                            description: "削除が成功しました",
                            type: "success",
                            closable: true,
                          });
                        }
                      }}
                    >
                      削除する
                    </Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
});
