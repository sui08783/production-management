import { Box, Button, CloseButton, Dialog, Field, HStack, Input, Portal, Stack, Table } from "@chakra-ui/react";
import { memo } from "react";
import { toaster } from "../ui/toaster";
import type { Order } from "@/types/api";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";

type Props = {
  order: Order;
  loadOrders: () => Promise<void>;
};

export const OrderRow = memo((props: Props) => {
  const { order, loadOrders } = props;

  const { deleteOrder } = useDeleteOrder();

  const { updateData, productName, machineName, deadline, quantity, setProductName, setMachineName, setDeadline, setQuantity } = useUpdateOrder();

  return (
    <Table.Row key={order.id} _hover={{ bg: "gray.50" }}>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell>{order.productName}</Table.Cell>
      <Table.Cell>{order.machineName}</Table.Cell>
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
                  order.id;
                  setProductName(order.productName);
                  setMachineName(order.machineName);
                  setDeadline(order.deadline);
                  setQuantity(order.quantity);
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

                  <Dialog.Body>
                    <Box w="100%">
                      <Stack gap="4">
                        <Field.Root>
                          <Field.Label>製品名</Field.Label>
                          <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>機械名</Field.Label>
                          <Input value={machineName} onChange={(e) => setMachineName(e.target.value)} />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>納期</Field.Label>
                          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>数量</Field.Label>
                          <Input type="number" value={quantity ?? ""} onChange={(e) => setQuantity(Number(e.target.value))} />
                        </Field.Root>
                      </Stack>
                    </Box>
                  </Dialog.Body>

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
