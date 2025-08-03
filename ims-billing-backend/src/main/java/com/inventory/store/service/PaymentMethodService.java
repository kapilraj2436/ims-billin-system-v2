package com.inventory.store.service;

import com.inventory.store.model.PaymentMethod;
import com.inventory.store.model.Payments;
import com.inventory.store.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private BankDetailsService bankDetailsService;

    public PaymentMethod addPaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    public PaymentMethod getPaymentMethodById(int paymentMethodId) {
        return paymentMethodRepository.findByPaymentMethodId(paymentMethodId);
    }

    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }
}
