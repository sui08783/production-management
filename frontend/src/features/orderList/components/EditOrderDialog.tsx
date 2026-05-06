import { memo } from "react";
import { Dialog, Field, Input,  Select, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { Order } from "@/types/Order";
import { orderStatusList } from "@/constants/orderStatus";
import { machineList } from "@/constants/MachineList";

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

            <Select.Root
              collection={machineList}
              value={[machineName]}
              onValueChange={(details) => {
                setMachineName(details.value[0] ?? "");
              }}
            >
              <Select.HiddenSelect />

              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="機械名を選択" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              
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
              
            </Select.Root>
          </Field.Root>

          <Select.Root
            collection={orderStatusList}
            value={[status]}
            onValueChange={(details) => {
              setStatus(details.value[0] ?? "");
            }}
          >
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
       
           
          </Select.Root>

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
