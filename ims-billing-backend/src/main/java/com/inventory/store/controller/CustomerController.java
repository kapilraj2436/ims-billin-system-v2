package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.Customer;
import com.inventory.store.service.CustomerService;
import com.inventory.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController implements CommonController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public void addCustomer(@RequestBody Customer customer) {
        customerService.addCustomer(customer);
    }

    @GetMapping("/search")
    public List<Customer> getAllCustomer() {
        return customerService.getAllCustomer();
    }

    @GetMapping("search/{customerId}")
    public Customer getCustomerById(@PathVariable int customerId) {
        return customerService.getCustomerById(customerId);
    }


}
