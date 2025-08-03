package com.inventory.store.repository;

import com.inventory.store.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
    List<OrderProduct> findOrderProductByOrderId(int orderId); // this works correctly
}
