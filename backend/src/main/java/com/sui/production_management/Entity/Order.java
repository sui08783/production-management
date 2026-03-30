package com.sui.production_management.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "product_name", nullable = false)
  private String productName;

  @Column(name = "machine_name", nullable = false)
  @Enumerated(EnumType.STRING)
  private MachineAssign machineName=MachineAssign.UNASSIGNED;

  @Column(name = "days", nullable = true)
  @Enumerated(EnumType.STRING)
  private DayOfWeek days= DayOfWeek.UNASSIGNED;


  @Column(name = "position", nullable = true)
  private int position;

  @Column(name = "status", nullable = false)
  @Enumerated(EnumType.STRING)
//  デフォルトでステータスは未着手
  private OrderStatus status =OrderStatus.NOT_STARTED;

  @Column(name = "deadline", nullable = false)
  private LocalDate deadline;


  @Column(name = "quantity", nullable = false)
  private int quantity;

  @Column(name = "create_day", nullable = false)
  @CreatedDate
  private LocalDate createDay;



}