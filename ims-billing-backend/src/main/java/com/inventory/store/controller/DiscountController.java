package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.Discount;
import com.inventory.store.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discount")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscountController implements CommonController {

    @Autowired
    private DiscountService discountService;

    @PostMapping("/add")
    public void addDiscount(@RequestBody Discount discount) {
        discountService.addDiscount(discount);
    }

    @GetMapping("/search")
    public List<Discount> getAllDiscounts() {
        return discountService.getAllDiscounts();
    }

}
