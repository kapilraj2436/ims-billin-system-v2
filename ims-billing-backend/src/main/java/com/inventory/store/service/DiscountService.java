package com.inventory.store.service;

import com.inventory.store.model.Discount;
import com.inventory.store.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    public Discount getDiscountByDiscountId(int discountId) {
        return discountRepository.findDiscountByDiscountId(discountId);
    }

    public void addDiscount(Discount discount) {
        discountRepository.save(discount);
    }

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

}
