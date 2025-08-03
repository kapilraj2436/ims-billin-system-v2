package com.inventory.store.service;

import com.inventory.store.model.OrderProduct;
import com.inventory.store.repository.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductService {

    @Autowired
    private OrderProductRepository orderProductRepository;

    public OrderProduct addOrderProduct(OrderProduct op) {
       return orderProductRepository.save(op);
    }

    public List<OrderProduct> findOrderProductByOrderId(int orderId) {
        return orderProductRepository.findOrderProductByOrderId(orderId);
    }
}
