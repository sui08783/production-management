import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

import { memo } from "react";
import { toaster } from "@/components/ui/toaster";
import type { Order } from "@/types/Order";
import { useDeleteOrder } from "../hooks/useDeleteOrder";

type Props = {
  order: Order;
  loadOrders: () => Promise<void>;
};

export const DeleteOrderDialog = memo((props: Props) => {
  const { order, loadOrders } = props;
  const { deleteOrder } = useDeleteOrder();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="lg" fontSize="md" colorPalette="red">
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
  );
});
