package com.inventory.store.controller;

import com.inventory.store.model.PaymentMethod;
import com.inventory.store.model.PaymentStatus;
import com.inventory.store.service.PaymentMethodService;
import com.inventory.store.service.PaymentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paymentStatus")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentStatusController {
    @Autowired
    private PaymentStatusService paymentStatusService;

    @PostMapping("/add")
    public PaymentStatus addPaymentStatus(@RequestBody PaymentStatus paymentStatus) {
        return paymentStatusService.addPaymentStatus(paymentStatus);
    }

    @GetMapping("/search")
    public List<PaymentStatus> getAllPaymentStatus() {
        return paymentStatusService.getAllPaymentStatus();
    }
}
