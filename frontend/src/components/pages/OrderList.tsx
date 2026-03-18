import { useLoadOrders } from "@/hooks/useLoadOrders";
import type { Order } from "@/types/order";

import { Box, Heading, Table } from "@chakra-ui/react";
import { memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { OrderRow } from "@/components/organisms/OrderRow";
import { OrderTableHeader } from "@/components/molecules/OrderTableHeader";

export const OrderList = memo(() => {
  const { orders, loadOrders } = useLoadOrders();

  return (
    <div>
      <Toaster />
      <Box maxW="1000px" mx="auto" mt="60px" p="8" borderWidth="1px" borderRadius="xl" shadow="md">
        <Heading size="lg" mb="6" textAlign="center">
          注文一覧
        </Heading>

        <Table.Root variant="outline" size="sm">
          <OrderTableHeader />
          <Table.Body>
            {orders.map((order: Order) => (
              <OrderRow key={order.id} order={order} loadOrders={loadOrders} />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
});
