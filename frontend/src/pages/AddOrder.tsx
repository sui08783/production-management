import { memo, useState } from "react";
import { Box, Button, Field, Heading, Input, Stack, Text } from "@chakra-ui/react";

export const AddOrder = memo(() => {
  const [productName, setProductName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [response, setResponse] = useState("");

  const sendData = () => {
    fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productName: productName, machineName: machineName, deadline: deadline, quantity: quantity }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.createOrder))
      .catch((err) => console.error("Error:", err));
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

        {response && (
          <Text mt="6" textAlign="center" color="green.500">
            {response}
          </Text>
        )}
      </Box>
    </>
  );
});
