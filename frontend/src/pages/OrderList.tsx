import { useLoadOrders } from "@/hooks/useLoadOrders";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";
import type { Order } from "@/types/api";
import { CloseButton, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { Box, Button, Heading, HStack, Table } from "@chakra-ui/react";
import { memo } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

export const OrderList = memo(() => {
  const { orders, loadOrders } = useLoadOrders();
  const { deleteOrder } = useDeleteOrder();

  const { updateData, editingId, productName, machineName, deadline, quantity, setEditingId, setProductName, setMachineName, setDeadline, setQuantity } = useUpdateOrder();
  return (
    <div>
      <Toaster />
      <Box maxW="1000px" mx="auto" mt="60px" p="8" borderWidth="1px" borderRadius="xl" shadow="md">
        <Heading size="lg" mb="6" textAlign="center">
          注文一覧
        </Heading>

        <Table.Root variant="outline" size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>商品名</Table.ColumnHeader>
              <Table.ColumnHeader>機械名</Table.ColumnHeader>
              <Table.ColumnHeader>納期</Table.ColumnHeader>
              <Table.ColumnHeader>数量</Table.ColumnHeader>
              <Table.ColumnHeader>作成日</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map((order: Order) => (
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
                            setEditingId(order.id);
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
                        <Button
                          size="xs"
                          colorPalette="red"
                          // onClick={async () => {
                          //   const success = await deleteOrder(order.id);

                          //   if (success) {
                          //     await loadOrders();
                          //     toaster.create({
                          //       description: "削除が成功しました",
                          //       type: "success",
                          //       closable: true,
                          //     });
                          //   }
                          // }}
                        >
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
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
});
