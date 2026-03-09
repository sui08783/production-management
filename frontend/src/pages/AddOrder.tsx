import { memo, useEffect, useState } from "react";
import { Box, Button, createListCollection, Field, Heading, Input, Portal, Select, Stack, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export const AddOrder = memo(() => {
  const [productName, setProductName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("NOT_STARTED");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const sendData = async () => {
    try {
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: productName, machineName: machineName, status: status, deadline: deadline, quantity: quantity }),
      });

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
      }, 1000);

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
    <>
      <Box maxW="400px" mx="auto" mt="60px" p="8" borderWidth="1px" borderRadius="xl" shadow="md">
        <Heading size="lg" mb="6" textAlign="center">
          注文登録
        </Heading>

        <Stack gap="4">
          <Field.Root>
            <Field.Label>製品名</Field.Label>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="製品名を入力" />
          </Field.Root>

          <Field.Root>
            <Field.Label>機械名</Field.Label>
            <Input value={machineName} onChange={(e) => setMachineName(e.target.value)} placeholder="機械名を入力" />
          </Field.Root>

          <Select.Root key="sm" size="sm" collection={frameworks} onValueChange={(e) => setStatus(e.value[0])}>
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
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
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
    </>
  );
});
const frameworks = createListCollection({
  items: [
    { label: "未着手", value: "NOT_STARTED" },
    { label: "加工中", value: "PROCESSING" },
    { label: "完了", value: "COMPLETED" },
  ],
});
