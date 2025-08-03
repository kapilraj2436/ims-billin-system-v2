package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.PaymentMethod;
import com.inventory.store.model.Payments;
import com.inventory.store.service.PaymentMethodService;
import com.inventory.store.service.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paymentMethod")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentMethodController implements CommonController {
    @Autowired
    private PaymentMethodService paymentMethodService;

    @PostMapping("/add")
    public PaymentMethod addPaymentMethod(@RequestBody PaymentMethod paymentMethod) {
        return paymentMethodService.addPaymentMethod(paymentMethod);
    }

    @GetMapping("/search")
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodService.getAllPaymentMethods();
    }


}
