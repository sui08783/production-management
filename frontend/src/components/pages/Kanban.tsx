import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Droppable } from "../kanban/Droppable";
import { Draggable } from "../kanban/Draggable";
import { css } from "@emotion/react";

const machines = ["機械A", "機械B", "機械C"];
const days = ["月", "火", "水", "木", "金"];

export const Kanban = () => {
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
      <div>
        {/* 曜日ヘッダー */}
        <div style={{ display: "flex" }}>
          <div style={{ width: 80 }}></div> {/* 左上の空白 */}
          {days.map((day) => (
            <div
              key={day}
              style={{
                width: 120,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 機械行 */}
        {machines.map((machine) => (
          <div key={machine} style={{ display: "flex" }}>
            {/* 機械名 */}
            <div style={{ width: 80 }}>{machine}</div>

            {/* セル */}
            {days.map((day) => {
              const cellId = `${machine}-${day}`;
              return (
                <Droppable
                  id={cellId}
                  key={cellId}
                  style={{
                    width: 120,
                    height: 120,
                    border: "1px solid black",
                    margin: 4,
                  }}
                >
                  {(cells[cellId] || []).map((cell) => {
                    return (
                      <Draggable key={cell.id} id={cell.id}>
                        {cell.name}
                      </Draggable>
                    );
                  })}
                </Droppable>
              );
            })}
          </div>
        ))}
      </div>
    </DndContext>
  );
};
