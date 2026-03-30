package com.sui.production_management.controller;

import com.sui.production_management.Entity.DayOfWeek;
import com.sui.production_management.Entity.MachineAssign;
import com.sui.production_management.Entity.Order;
import com.sui.production_management.Entity.OrderStatus;
import com.sui.production_management.repository.OrderRepository;
import com.sui.production_management.service.OrderService;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/kanban")
@CrossOrigin(origins = "http://localhost:5173")
public class KanbanController {

  public final OrderService orderService;

  public KanbanController(OrderService orderService, OrderRepository orderRepository) {
    this.orderService = orderService;
    this.orderRepository = orderRepository;
  }

  private final OrderRepository orderRepository;


  @PutMapping("/{id}")
  public Order updateKanban(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
    Order order = orderRepository.findById(id).orElseThrow();

    if (updates.containsKey("machineName")) {
      order.setMachineName(MachineAssign.valueOf((String) updates.get("machineName")));
    }

    if (updates.containsKey("days")) {
      Object day = updates.get("days");
      order.setDays(day != null ? DayOfWeek.valueOf((String) day) : DayOfWeek.UNASSIGNED);
    }

    if (updates.containsKey("position")) {
      Object pos = updates.get("position");
      order.setPosition(pos != null ? ((Number) pos).intValue() : 0);
    }

    if (updates.containsKey("status")) {
      Object status = updates.get("status");
      order.setStatus(status != null ? OrderStatus.valueOf((String) status) : OrderStatus.HEAT_TREATMENT);
    }

    return orderRepository.save(order);
  }
}
