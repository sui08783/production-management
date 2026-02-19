package com.sui.production_management.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "product_name", nullable = false)
  private String productName;

  @Column(name = "machine_name", nullable = false)
  private String machineName;

  @Column(name = "deadline", nullable = false)
  private LocalDate deadline;


  @Column(name = "quantity", nullable = false)
  private int quantity;

  @Column(name = "create_day", nullable = false)
  private LocalDate createDay;



}