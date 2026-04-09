import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { memo } from "react";
import { EditOrderDialog } from "./EditOrderDialog";
import type { Order } from "@/types/Order";
import { orderStatus } from "@/constains/orderStatus";
import { toaster } from "../ui/toaster";

type Props = {
  order: Order;
  loadOrders: () => Promise<void>;

  editingOrder: Order | null;
  setEditingOrder: (order: Order) => void;
  updateData: () => Promise<boolean>;
  productName: string;
  machineName: string;
  status: string;
  deadline: string;
  quantity: number;
  setProductName: (value: string) => void;
  setMachineName: (value: string) => void;
  setStatus: (value: string) => void;
  setDeadline: (value: string) => void;
  setQuantity: (value: number) => void;
};

export const UpdataOrderDialog = memo((props: Props) => {
  const { order, loadOrders, editingOrder, setEditingOrder, updateData, productName, machineName, deadline, quantity, setProductName, setMachineName, setStatus, setDeadline, setQuantity } = props;

  return (
    <Dialog.Root size="lg">
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          colorPalette="blue"
          fontSize="md"
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
  );
});
