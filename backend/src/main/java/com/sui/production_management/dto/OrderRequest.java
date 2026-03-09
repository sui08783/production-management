package com.sui.production_management.dto;
import java.time.LocalDate;
import lombok.Data;

@Data
public class OrderRequest {

  private String productName;

  private String machineName;

  private String status;

  private LocalDate deadline;

  private int quantity;

}
