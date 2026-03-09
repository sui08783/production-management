package com.sui.production_management.Entity;

public enum OrderStatus {
  NOT_STARTED, // 未着手
  PROCESSING,  // 加工中
  HEAT_TREATMENT, // 熱処理
  GRINDING, //研磨
  PACKING,//袋詰め
  COMPLETED    // 完了
}