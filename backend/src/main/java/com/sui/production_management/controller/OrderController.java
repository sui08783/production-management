package com.sui.production_management.controller;

import com.sui.production_management.Entity.Order;
import com.sui.production_management.dto.OrderRequest;
import com.sui.production_management.service.OrderService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

  public final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public List<Order> showTask() {
    return orderService.getAllOrders();
  }

  @PostMapping
  public Order createOrder(@RequestBody OrderRequest request) {
    return orderService.createOrder(request);
  }

  @DeleteMapping("/{id}")
  public void deleteOrder(@PathVariable Long id) {
    orderService.deleteOrder(id);
  }

  @PutMapping("/{id}")
  public void updateOrder(@PathVariable Long id,@RequestBody Order order) {
    orderService.updateOrder(id,order);
  }
}
