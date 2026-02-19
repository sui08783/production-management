package com.sui.production_management.controller;

import com.sui.production_management.Entity.Order;
import com.sui.production_management.service.OrderService;
import java.util.List;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {

  public final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public List<Order> showTask(Model model){
    return orderService.getAllOrders();
  }

  @PostMapping
  public Order createTask(@RequestBody Order order){
   return orderService.createOrder(order);
}




}
