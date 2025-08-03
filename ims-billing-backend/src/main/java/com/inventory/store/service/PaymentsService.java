package com.inventory.store.service;

import com.inventory.store.model.PaymentMethod;
import com.inventory.store.model.PaymentStatus;
import com.inventory.store.model.Payments;
import com.inventory.store.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PaymentsService {

    @Autowired
    private PaymentsRepository paymentsRepository;

    @Autowired
    private PaymentStatusService paymentStatusService;

    @Autowired
    private PaymentMethodService paymentMethodService;

    public Payments addPayments(Payments payment) {
        return paymentsRepository.save(payment);
    }

    public List<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }


    public Payments getPaymentByPaymentId(int paymentId) {
        return paymentsRepository.findPaymentByPaymentId(paymentId);
    }

    public void updatePayments(Payments payments) {
        paymentsRepository.save(payments);
    }

}
