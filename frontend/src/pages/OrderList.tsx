import { useLoadOrders } from "@/features/orderList/hooks/useLoadOrders";
import type { Order } from "@/types/Order";

import { Box, Heading, Table } from "@chakra-ui/react";
import { memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { OrderRow } from "@/features/orderList/components/OrderRow";
import { OrderTableHeader } from "@/features/orderList/components/OrderTableHeader";
import { HeaderLayout } from "@/features/orderList/components/HeaderLayout";

export const OrderList = memo(() => {
  const { orders, loadOrders } = useLoadOrders();

  return (
    <HeaderLayout>
      <Toaster />
      <Box maxW="1280px" mx="auto" mt="60px" p="8" borderWidth="1px" borderRadius="xl" shadow="md" fontSize="lg">
        <Heading size="lg" mb="6" textAlign="center">
          工程一覧
        </Heading>

        <Table.Root variant="outline" size="lg">
          <OrderTableHeader />
          <Table.Body>
            {orders.map((order: Order) => (
              <OrderRow key={order.id} order={order} loadOrders={loadOrders} />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </HeaderLayout>
  );
});
