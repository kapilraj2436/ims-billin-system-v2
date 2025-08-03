package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.Order;
import com.inventory.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController implements CommonController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public void addOrder(@RequestBody Order order) {
        orderService.addOrder(order);
    }

    @GetMapping("/search")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/search/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/customerOrders/{customerId}")
    public List<Order> getOrdersByCustomerId(@PathVariable int customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }


}
