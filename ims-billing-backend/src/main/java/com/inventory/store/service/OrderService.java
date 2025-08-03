package com.inventory.store.service;

import com.inventory.store.model.*;
import com.inventory.store.repository.OrderProductRepository;
import com.inventory.store.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    @Autowired
    private DiscountService discountService;

    @Autowired
    private PaymentsService paymentsService;

    @Autowired
    private OrderProductService orderProductService;

    public void addOrder(Order order) {
        Payments payment = paymentsService.addPayments(order.getPayment());
        order.setPayment(payment);
        Order savedOrder = saveOrder(order);
        for (Product product : order.getProducts()) {
            OrderProduct op = new OrderProduct();
            op.setOrderId(savedOrder.getOrderId());
            op.setProductId(product.getProductId());
            op.setQuantity(product.getOrderQuantity());
            orderProductService.addOrderProduct(op);
        }
    }
    @Transactional
    private Order saveOrder(Order order){
        return orderRepository.save(order);
    }

    public Order getOrderById(int orderId) {
        Order order = orderRepository.findOrderByOrderId(orderId);
        List<OrderProduct> ops = orderProductService.findOrderProductByOrderId(orderId);
        List<Product> products = new ArrayList<>();
        for (OrderProduct op : ops) {
            Product p = productService.getProduct(op.getProductId());
            p.setOrderQuantity(op.getQuantity());
            products.add(p);
        }
        Customer customer = customerService.getCustomerById(order.getCustomer().getCustomerId()); // Implement this method accordingly
        Discount discount = discountService.getDiscountByDiscountId(order.getDiscount().getDiscountId());
        Payments payments = paymentsService.getPaymentByPaymentId(order.getPayment().getPaymentId());
        order.setProducts(products);
        order.setCustomer(customer);
        order.setDiscount(discount);
        order.setPayment(payments);
        return order;
    }
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            List<Product> products = new ArrayList<>();
            List<OrderProduct> ops = orderProductService.findOrderProductByOrderId(order.getOrderId());
            for (OrderProduct op : ops) {
                Product p = productService.getProduct(op.getProductId());
                p.setOrderQuantity(op.getQuantity());
                products.add(p);
            }
            Customer customer = customerService.getCustomerById(order.getCustomer().getCustomerId()); // Implement this method accordingly
            Discount discounts = discountService.getDiscountByDiscountId(order.getDiscount().getDiscountId());
            Payments payments = paymentsService.getPaymentByPaymentId(order.getPayment().getPaymentId());
            order.setProducts(products);
            order.setCustomer(customer);
            order.setDiscount(discounts);
            order.setPayment(payments);
        }
        return orders;

    }

    public List<Order> getOrdersByCustomerId(int customerId) {
        return orderRepository.findByCustomer_CustomerId(customerId);
    }
}
