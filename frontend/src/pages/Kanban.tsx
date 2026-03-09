import { useLoadOrders } from "@/hooks/useLoadOrders";
import type { Order } from "@/types/api";
import { Box, Heading,  Text } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export const Kanban = () => {
  const { orders, setOrders } = useLoadOrders();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = [...orders];
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setOrders(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="orders" direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Box display="flex" gap="4" mt="10">
              {orders.map((order: Order, index) => (
                <Draggable key={String(order.id)} draggableId={String(order.id)} index={index}>
                  {(provided) => (
                    <Box w="260px" p="5" borderWidth="1px" borderRadius="xl" shadow="sm" bg="white" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Heading size="sm" mb="3">
                        {order.productName}
                      </Heading>

                      <Text fontSize="sm" color="gray.600">
                        機械：{order.machineName}
                      </Text>

                      <Text fontSize="sm" color="gray.600">
                        納期：{order.deadline}
                      </Text>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
