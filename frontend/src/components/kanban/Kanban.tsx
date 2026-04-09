import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useLoadOrders } from "@/hooks/useLoadOrders";
import { useKanbanUpdate } from "@/hooks/useKanbanUpdate";
import { useKanbanComplete } from "@/hooks/useKanbanComplete";
import type { Order } from "@/types/Order";
import type { Machine } from "@/types/Machine";
import type { Days } from "@/types/Days";
import { KanbanCard } from "./KanbanCards";
import type { OrderStatus } from "@/types/OrderStatus";
import { useKanbanDrag } from "@/hooks/useKanbanDrag";

/**
 * カンバンボードの表示をするページコンポーネント
 *
 * 注文データをセルに表示
 * 縦軸 機械名、横軸 曜日でドラッグ＆ドロップで機械・曜日を変更
 *
 * 
 *
 */

// ===== レイアウト設定 =====
const CELL_WIDTH = "220px";
const LABEL_WIDTH = "120px";
const COLUMN_COUNT = 5;
const GRID_TEMPLATE = `${LABEL_WIDTH} repeat(${COLUMN_COUNT}, ${CELL_WIDTH})`;

// ==========================

const machines: Machine[] = ["MACHINE_A", "MACHINE_B", "MACHINE_C"];
const days: Days[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const unassigned = "UNASSIGNED";

export const Kanban = () => {
  const { orders } = useLoadOrders();
  const kanbanUpdate = useKanbanUpdate();
  const kanbanComplete = useKanbanComplete();

  const [cells, setCells] = useState<Record<string, Order[]>>({});

/**
 * 
 * カンバンボードのカード内のチェックボックスをオンにしたときの処理
 * 

 */


  const handleCheck = async (id: number, newState: OrderStatus) => {
    await kanbanComplete.checkComplete({ id, status: newState });

    setCells((prev) => {
      const newCells = { ...prev };
      Object.keys(newCells).forEach((cellId) => {
        newCells[cellId] = newCells[cellId].map((c) => (c.id === id ? { ...c, status: newState } : c));
      });
      return newCells;
    });
  };

  // 初期データ整形
  useEffect(() => {
    if (Object.keys(cells).length > 0) return;

    const grouped: Record<string, Order[]> = {};

    const filteredOrders = orders.filter((o) => o.status === "NOT_STARTED" || o.status === "PROCESSING");

    filteredOrders.forEach((order) => {
      if (!order.days || order.days === "UNASSIGNED") {
        if (!grouped[unassigned]) grouped[unassigned] = [];
        grouped[unassigned].push(order);
        return;
      }

      const key = `${order.machineName}-${order.days}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(order);
    });

    setCells(grouped);
  }, [orders]);

  //  ドラッグ処理
  const handleDragEnd = useKanbanDrag({
    setCells,
    kanbanUpdate,
    unassigned,
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box bg="gray.100" minH="100vh" p={6}>
        <Box maxW="1400px" mx="auto" p={4} bg="white" borderRadius="xl" boxShadow="md">
          {/* ===== グリッド ===== */}
          <Box overflowX="auto">
            <Box display="grid" gridTemplateColumns={GRID_TEMPLATE} gap={2}>
              {/* ヘッダー */}
              <Box />
              {days.map((day) => (
                <Box key={day} textAlign="center" fontWeight="bold" bg="gray.100" py={2} borderRadius="md">
                  {day}
                </Box>
              ))}

              {/* 行 */}
              {machines.map((machine) => (
                <>
                  {/* ラベル */}
                  <Box key={machine} display="flex" alignItems="center" justifyContent="center" fontWeight="bold" bg="gray.200" borderRadius="md">
                    {machine}
                  </Box>

                  {/* セル */}
                  {days.map((day) => {
                    const cellId = `${machine}-${day}`;
                    return (
                      <Droppable id={cellId} key={cellId}>
                        <Box minH="220px" p={5} bg="gray.50" border="1px solid" borderColor="gray.200" borderRadius="lg" _hover={{ bg: "blue.50" }}>
                          <Flex direction="column" gap={2} align="center">
                            {(cells[cellId] || []).map((cell) => (
                              <Draggable key={cell.id} id={cell.id}>
                                <Box w="150px" boxShadow="sm" borderRadius="md">
                                  <KanbanCard cell={cell} onCheck={handleCheck} />
                                </Box>
                              </Draggable>
                            ))}
                          </Flex>

                          {(cells[cellId] || []).length === 0 && (
                            <Text fontSize="xs" color="gray.400" textAlign="center">
                              なし
                            </Text>
                          )}
                        </Box>
                      </Droppable>
                    );
                  })}
                </>
              ))}
            </Box>
          </Box>

          {/* 未割り当てエリア  */}
          <Droppable id={unassigned}>
            <Box mt={6} p={4} bg="orange.50" border="2px dashed" borderColor="orange.300" borderRadius="lg">
              <Text fontWeight="bold" mb={3}>
                未割り当て
              </Text>

              <Flex direction="row" gap={2}>
                {(cells[unassigned] || []).map((cell) => (
                  <Draggable key={cell.id} id={cell.id}>
                    <Box w="150px" boxShadow="sm" borderRadius="md">
                      <KanbanCard cell={cell} onCheck={handleCheck} />
                    </Box>
                  </Draggable>
                ))}
              </Flex>

              {(cells[unassigned] || []).length === 0 && (
                <Text fontSize="xs" color="gray.400" textAlign="center">
                  なし
                </Text>
              )}
            </Box>
          </Droppable>
        </Box>
      </Box>
    </DndContext>
  );
};
