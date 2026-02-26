package com.sui.production_management.service;

import com.sui.production_management.Entity.Order;
import com.sui.production_management.dto.OrderRequest;
import com.sui.production_management.repository.OrderRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
  public Order createOrder(OrderRequest request) {

    Order order = new Order();
    order.setProductName(request.getProductName());
    order.setMachineName(request.getMachineName());
    order.setDeadline(request.getDeadline());
    order.setQuantity(request.getQuantity());
    order.setCreateDay(LocalDate.now());
    return orderRepository.save(order);
  }

  @Override
  @Transactional
  public void deleteOrder(Long id) {
    orderRepository.deleteById(id);
  }

  @Override
  @Transactional
  public void updateOrder(Long id, Order order) {
    Optional<Order> optionalEntity = orderRepository.findById(id);
    if (optionalEntity.isPresent()) {
      Order entity = optionalEntity.get();

      entity.setProductName(order.getProductName());
      entity.setMachineName(order.getMachineName());
      entity.setDeadline(order.getDeadline());
      entity.setQuantity(order.getQuantity());


    }
  }
}


