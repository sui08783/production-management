import { memo, useState } from "react";
import { Box, Button, Field, Heading, Input, Portal, Select, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { orderStatusList } from "@/constains/orderStatus";
import { HeaderLayout } from "../templates/HeaderLayout";
import { machineList } from "@/constains/MachineList";
import type { Machine } from "@/types/Machine";

export const AddOrder = memo(() => {
  const [productName, setProductName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("NOT_STARTED");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState<number>();

  const sendData = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: productName, machineName: machineName, status: status, deadline: deadline, quantity: quantity }),
      }
    );


      

      if (!res.ok) {
        throw new Error("登録失敗しました");
      }

      toaster.create({
        description: "工程の追加が成功しました",
        type: "success",
        closable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 200);

      return true;
    } catch (err) {
      toaster.create({
        description: "工程の追加が失敗しました",
        type: "error",
        closable: true,
      });

      return false;
    }
  };
  return (
    <HeaderLayout>
      <Box maxW="400px" mx="auto" mt="60px" p="8" borderWidth="1px" borderRadius="xl" shadow="md">
        <Heading size="lg" mb="6" textAlign="center">
          工程登録
        </Heading>

        <Stack gap="4">
          <Field.Root>
            <Field.Label>製品名</Field.Label>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="製品名を入力" />
          </Field.Root>

          <Field.Root>
            <Field.Label>機械名</Field.Label>

            <Select.Root collection={machineList} onValueChange={(e) => setMachineName(e.value[0] as Machine)}>
              <Select.HiddenSelect />

              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="機械名を選択" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {machineList.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field.Root>

          <Select.Root collection={orderStatusList} onValueChange={(e) => setStatus(e.value[0])}>
            <Select.HiddenSelect />
            <Select.Label>加工状態</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="加工状態を入力" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {orderStatusList.items.map((orderStatusItem) => (
                    <Select.Item item={orderStatusItem} key={orderStatusItem.value}>
                      {orderStatusItem.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Field.Root>
            <Field.Label>納期</Field.Label>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </Field.Root>

          <Field.Root>
            <Field.Label>数量</Field.Label>
            <Input type="number" value={quantity ?? ""} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="数量を入力" />
          </Field.Root>

          <Button colorPalette="blue" onClick={sendData}>
            登録する
          </Button>
        </Stack>
      </Box>
    </HeaderLayout>
  );
});
