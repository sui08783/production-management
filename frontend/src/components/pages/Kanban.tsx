import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { Droppable } from "../kanban/Droppable";
import { Draggable } from "../kanban/Draggable";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useLoadOrders } from "@/hooks/useLoadOrders";

const machines = ["機械A", "機械B", "機械C"];
const days = ["月", "火", "水", "木", "金"];

export const Kanban = () => {
  const { orders, loadOrders } = useLoadOrders();

  const [cells, setCells] = useState({
    "機械A-月": [
      { id: "1", name: "注文A" },
      { id: "2", name: "注文B" },
    ],
    "機械B-火": [{ id: "3", name: "注文C" }],
  });

  return (
    <DndContext
      onDragEnd={(event) => {
        // active →現在ドラッグしているカード
        // over →ドロップされた セル
        const { active, over } = event;

        // ドロップされた場所がセル以外だった場合はリターン
        if (!over) return;

        const cardId = active.id;
        const toCellId = over.id;

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
      {/* 背景をテーブルUIに寄せる */}
      <Box bg="gray.50" minH="100vh" p={6}>
        {/* 外枠（OrderListと同じ雰囲気） */}
        <Box maxW="1000px" mx="auto" p={6} bg="white" borderWidth="1px" borderRadius="xl" boxShadow="sm">
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
                            <Box p={2} mb={2} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200" fontSize="sm" cursor="grab" _hover={{ bg: "gray.100" }} _active={{ cursor: "grabbing" }}>
                              <Text>{cell.name}</Text>
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

          <Droppable id="unassigned">
            <Box mb={6} p={4} bg="white" borderWidth="1px" borderRadius="xl" borderColor="gray.200">
              <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.600">
                未割り当て
              </Text>

              <Flex wrap="wrap">
                <Box p={2} bg="gray.50" border="1px dashed" borderColor="gray.300" borderRadius="md" w="100%" textAlign="center">
                  <Text fontSize="xs" color="gray.400">
                    ここにドラッグで戻す（仮）
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Droppable>
        </Box>
      </Box>
    </DndContext>
  );
};
