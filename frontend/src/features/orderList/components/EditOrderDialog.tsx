import { memo } from "react";
import { Dialog, Field, Input, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { Order } from "@/types/Order";

type Props = {
  order: Order;
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

// 工程編集用のダイアログ
export const EditOrderDialog = memo((props: Props) => {
  const { productName, machineName, status, deadline, quantity, setProductName, setMachineName, setStatus, setDeadline, setQuantity } = props;

  return (
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
            <Field.Label>状態</Field.Label>
            <Input value={status} onChange={(e) => setStatus(e.target.value)} />
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
  );
});
