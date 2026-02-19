package com.sui.production_management.service;

import com.sui.production_management.Entity.Order;
import com.sui.production_management.repository.OrderRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class OrderServiceImpl implements OrderService {


 public final OrderRepository orderRepository;

  public OrderServiceImpl(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @Override
  public List<Order> getAllOrders() {
    return orderRepository.findAll();
  }

  @Override
  public Order createOrder(@RequestBody Order order){
    return  orderRepository.save(order);
  }
}
