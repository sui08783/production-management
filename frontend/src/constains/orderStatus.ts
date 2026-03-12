// バックエンドからのデータを日本語へ変換するためのファイル

import { createListCollection } from "@chakra-ui/react";

export const orderStatus = {
  NOT_STARTED: "未着手",
  PROCESSING: "加工中",
  HEAT_TREATMENT: "熱処理",
  GRINDING: "研磨",
  PACKING: "袋詰め",
  COMPLETED: "完了",
};

// セレクトボックスの表示を日本語へ変換
export const orderStatusList = createListCollection({
  items: [
    { label: "未着手", value: "NOT_STARTED" },
    { label: "加工中", value: "PROCESSING" },
    { label: "熱処理", value: "HEAT_TREATMENT" },
    { label: "研磨", value: "GRINDING" },
    { label: "袋詰め", value: "PACKING" },
    { label: "完了", value: "COMPLETED" },
  ],
});
