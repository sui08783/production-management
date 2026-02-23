package com.sui.production_management.service;

import com.sui.production_management.Entity.Order;
import java.time.LocalDate;
import java.util.List;


public interface OrderService {

  List<Order> getAllOrders();

  Order createOrder(Order order);

  void deleteOrder(Long id);

 void updateOrder(Long id, Order order);
}
