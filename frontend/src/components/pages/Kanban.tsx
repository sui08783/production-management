import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Droppable } from "../kanban/Droppable";
import { Draggable } from "../kanban/Draggable";
import { Box, Text, Flex, Checkbox } from "@chakra-ui/react";
import { useLoadOrders } from "@/hooks/useLoadOrders";
import { useKanbanUpdate } from "@/hooks/useKanbanUpdate";
import { useKanbanComplete } from "@/hooks/useKanbanComplete";

// セルヘッダー用
const machines = ["MACHINE_A", "MACHINE_B", "MACHINE_C"];
const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const unassigned = "UNASSIGNED";

export const Kanban = () => {
  const { orders } = useLoadOrders();

  const kanbanUpdate = useKanbanUpdate();

  const kanbanComplete = useKanbanComplete();

  const [cells, setCells] = useState({});

  useEffect(() => {
    if (Object.keys(cells).length > 0) return;

    // 機械×曜日の割当用の空の配列
    const grouped = {};

    // 全ての注文データから、状態が未着手と加工中の注文のみ表示させるためのフィルター
    const filteredOrders = orders.filter((order) => order.status === "NOT_STARTED" || order.status === "PROCESSING");

    //  セルの位置決め用の機械×曜日のキーを設定
    filteredOrders.forEach((order) => {
      //  daysがない場合は未割り当て
      if (!order.days || order.days === "UNASSIGNED") {
        if (!grouped[unassigned]) grouped[unassigned] = [];
        grouped[unassigned].push(order);
        return;
      }

      // セルの位置決め用のキー
      const key = `${order.machineName}-${order.days}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(order);
    });

    setCells(grouped);
  }, [orders]);

  return (
    <DndContext
      onDragEnd={async (event) => {
        // active →現在ドラッグしているカード
        // over →ドロップされた セル
        const { active, over } = event;

        // ドロップされた場所がセル以外だった場合はリターン
        if (!over) return;

        const cardId = active.id;
        const toCellId = over.id;

        const [machine, day] = toCellId === unassigned ? ["UNASSIGNED", "UNASSIGNED"] : String(toCellId).split("-");

        // prevは更新前の最新のstate(セルID:[注文名])
        // スプレット構文で元の配列をコピー(stateを更新して最新の配列をつかうため)
        setCells((prev) => {
          const newCells = { ...prev };

          // cellsのkey一覧から「指定のカードIDを含んでいるセル」を探して、そのセルIDを取得する(find)。そして一致しているものがあれば、trueを返して終了(some)
          const fromCellId = Object.keys(prev).find((cellId) => prev[cellId].some((card) => card.id === cardId));

          // 指定のカードIDを含んでいるセルがなかったらリターン
          if (!fromCellId) return prev;

          // 移動前と移動後のセルが同じだった場合はリターン
          if (fromCellId === toCellId) return prev;

          // 全セル情報の中から、移動しようとしているカードを探し出し、そのカードのオブジェクトを取り出す
          const movedCard = newCells[fromCellId].find((card) => card.id === cardId);

          const targetCards = prev[toCellId] || [];

          const maxPosition = targetCards.length > 0 ? Math.max(...targetCards.map((c) => c.position || 0)) : 0;

          const newPosition = maxPosition + 1;

          kanbanUpdate.updateData(cardId, machine, day, newPosition);

          //  指定のセルIDをもつセルの中に、今回移動するカードが有るかをフィルターし、移動するカード以外の配列を再度作成
          newCells[fromCellId] = prev[fromCellId].filter((card) => card.id !== cardId);

          // 移動先のセルにコピーを作成 何も無ければ空配列を渡す
          newCells[toCellId] = [...(prev[toCellId] || [])];

          // 動かそうとするカードが有る場合、移動先のセルに動かすカードを追加
          if (movedCard) {
            newCells[toCellId].push(movedCard);
          }

          return newCells;
        });
      }}
    >
      <Box bg="gray.50" minH="100vh" p={6}>
        <Box maxW="auto" mx="auto" p={6} bg="white" borderWidth="1px" borderRadius="xl" boxShadow="sm">
          {/* 曜日ヘッダー */}
          <Flex mb={4}>
            <Box w="100px" /> {/* 左上の空白 */}
            {days.map((day) => (
              <Box key={day} w="120px" textAlign="center" fontWeight="bold" fontSize="sm" color="gray.600" py={2} borderBottom="1px solid" borderColor="gray.200" mx={1}>
                {day}
              </Box>
            ))}
          </Flex>

          {/* 機械行 */}
          {machines.map((machine) => (
            <Flex key={machine} mb={2}>
              {/* 機械名 */}
              <Flex w="100px" align="center" justify="center" fontWeight="semibold" fontSize="sm" color="gray.700" borderRight="1px solid" borderColor="gray.200" mr={2}>
                {machine}
              </Flex>

              {/* セル */}
              {days.map((day) => {
                const cellId = `${machine}-${day}`;
                return (
                  <Droppable id={cellId} key={cellId}>
                    <Box w="120px" minH="120px" p={2} mx={1} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
                      {(cells[cellId] || []).length === 0 && (
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                          なし
                        </Text>
                      )}

                      {(cells[cellId] || []).map((cell) => {
                        return (
                          <Draggable key={cell.id} id={cell.id}>
                            <Box p={3} mb={2} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200" boxShadow="sm" fontSize="sm" cursor="grab" _hover={{ bg: "gray.50", boxShadow: "md" }} _active={{ cursor: "grabbing", boxShadow: "lg" }}>
                              {/* 情報（全部縦） */}
                              <Flex direction="column" gap={1}>
                                <Text fontWeight="bold" fontSize="md">
                                  {cell.productName}
                                </Text>
                                <Text color="gray.700">{cell.quantity}本</Text>
                                <Text color="gray.500" fontSize="xs">
                                  {cell.deadline}
                                </Text>
                              </Flex>

                              {/* 区切り */}
                              <Box borderTop="1px solid" borderColor="gray.100" my={3} />

                              {/* アクション */}
                              <Checkbox.Root
                                size="sm"
                                colorPalette="cyan"
                              
  checked={cell.status === "HEAT_TREATMENT"}
                               onCheckedChange={async (e) => {
  const checked = e.checked === true;

  const newState = checked
    ? "HEAT_TREATMENT"
    : "NOT_STARTED";

  // DB更新
  await kanbanComplete.checkComplete(cell.id, newState);

  // ★ これを追加（超重要）
  setCells((prev) => {
    const newCells = { ...prev };

    Object.keys(newCells).forEach((cellId) => {
      newCells[cellId] = newCells[cellId].map((c) =>
        c.id === cell.id
          ? { ...c, status: newState }
          : c
      );
    });

    return newCells;
  });
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
                          </Draggable>
                        );
                      })}
                    </Box>
                  </Droppable>
                );
              })}
            </Flex>
          ))}

          <Droppable id={unassigned} key={unassigned}>
            <Box w="100%" minH="120px" p={2} mx={1} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
              <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.600">
                未割り当て
              </Text>

              {(cells[unassigned] || []).length === 0 && (
                <Text fontSize="xs" color="gray.400" textAlign="center">
                  なし
                </Text>
              )}

              {(cells[unassigned] || []).map((card) => (
                <Draggable key={card.id} id={card.id}>
                  <Box p={2} mb={2} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200" fontSize="sm" cursor="grab" _hover={{ bg: "gray.100" }} _active={{ cursor: "grabbing" }}>
                    <Text>{card.productName}</Text>
                    <Text>{card.quantity}本</Text>
                    <Text>{card.deadline}</Text>
                    <Checkbox.Root
                      size="sm"
                      colorPalette="cyan"
                      onCheckedChange={(e) => {
                        if (e.checked) {
                          // 処理
                        }
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
                </Draggable>
              ))}
            </Box>
          </Droppable>
        </Box>
      </Box>
    </DndContext>
  );
};
