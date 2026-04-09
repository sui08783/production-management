import type { Order } from "@/types/Order";
import type { OrderStatus } from "@/types/OrderStatus";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";

/**
 * カンバンボードでドラッグ可能な要素
 *
 * @param props.cell - 表示する注文データ
 *
 * @param props.onCheck -熱処理へステータスを変更するためのチェックボックスの処理
 * (未着手 or 加工中 ↔ 熱処理 )
 */

type Props = {
  cell: Order;
  onCheck: (id: number, newState: OrderStatus) => Promise<void>;
};

export const KanbanCard = (props: Props) => {
  const { cell, onCheck } = props;

  return (
    <Box p={3} mb={2} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" boxShadow="sm" fontSize="sm" cursor="grab" _hover={{ bg: "gray.50", boxShadow: "md" }} _active={{ cursor: "grabbing", boxShadow: "lg" }}>
      <Flex direction="column" gap={1}>
        <Text fontWeight="bold" fontSize="md">
          {cell.productName}
        </Text>
        <Text color="gray.700">{cell.quantity}本</Text>
        <Text color="gray.500" fontSize="xs">
          {cell.deadline}
        </Text>
      </Flex>

      <Box borderTop="1px solid" borderColor="gray.100" my={3} />

      <Checkbox.Root
        size="sm"
        colorPalette="cyan"
        checked={cell.status === "HEAT_TREATMENT"}
        onCheckedChange={(e) => {
          const checked = e.checked === true;
          const newState = checked ? "HEAT_TREATMENT" : "NOT_STARTED";

          onCheck(cell.id, newState);
        }}
      >
        <Flex align="center" gap={2}>
          <Checkbox.Control />
          <Checkbox.Label fontSize="xs" color="gray.700">
            熱処理へ
          </Checkbox.Label>
        </Flex>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Box>
  );
};
