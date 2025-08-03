package com.inventory.store.service;

import com.inventory.store.model.PaymentStatus;
import com.inventory.store.repository.PaymentStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PaymentStatusService {

    @Autowired
    private PaymentStatusRepository paymentStatusRepository;

    public PaymentStatus addPaymentStatus(PaymentStatus paymentStatus) {
        return paymentStatusRepository.save(paymentStatus);
    }

    public PaymentStatus getPaymentStatusById(int paymentStatusId) {
        return paymentStatusRepository.findByPaymentStatusId(paymentStatusId);
    }
    public List<PaymentStatus> getAllPaymentStatus() {
        return paymentStatusRepository.findAll();
    }

}
