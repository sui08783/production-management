import type { Order } from "@/types/Order";
import type { DragEndEvent } from "@dnd-kit/core";

type Props = {
  setCells: React.Dispatch<React.SetStateAction<Record<string, Order[]>>>;
  kanbanUpdate: {
    updateData: (params: { cardId: number; machine: string; day: string; newPosition: number }) => Promise<boolean>;
  };
  unassigned: string;
};

export const useKanbanDrag = (props: Props) => {
  const { setCells, kanbanUpdate, unassigned } = props;

  const handleDragEnd = async (event: DragEndEvent) => {
    // active →現在ドラッグしているカード
    // over →ドロップされた セル
    const { active, over } = event;

    // ドロップされた場所がセル以外だった場合はリターン
    if (!over) return;

    const cardId = Number(active.id);
    const toCellId = over.id;

    const [machine, day] = toCellId === unassigned ? ["UNASSIGNED", "UNASSIGNED"] : String(toCellId).split("-");

    // prevは更新前の最新のstate(セルID:[注文名])
    // スプレット構文で元の配列をコピー(stateを更新して最新の配列をつかうため)
    setCells((prev) => {
      const newCells: Record<string, Order[]> = { ...prev };

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

      kanbanUpdate.updateData({
        cardId,
        machine,
        day,
        newPosition,
      });

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
  };
  return handleDragEnd;
};
