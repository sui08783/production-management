package com.sui.production_management.service;

import com.sui.production_management.Entity.Order;
import com.sui.production_management.dto.OrderRequest;
import java.time.LocalDate;
import java.util.List;


public interface OrderService {

  List<Order> getAllOrders();

  Order createOrder(OrderRequest request);

  void deleteOrder(Long id);

 void updateOrder(Long id, Order order);
}
