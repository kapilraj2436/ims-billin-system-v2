package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.BankDetails;
import com.inventory.store.service.BankDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bankDetails")
@CrossOrigin(origins = "http://localhost:3000")
public class BankDetailsController implements CommonController {

    @Autowired
    private BankDetailsService bankDetailsService;

    @PostMapping("/add")
    public void addBankDetails(@RequestBody BankDetails bankDetails) {
        bankDetailsService.addBankDetails(bankDetails);
    }

    @PostMapping("/update")
    public void updateBankDetails(@RequestBody BankDetails bankDetails) {
        bankDetailsService.updateBankDetails(bankDetails);
    }

    @PostMapping("delete")
    public void deleteBankDetails(BankDetails bankDetails) {

    }

    @PostMapping("/search/{id}")
    public BankDetails searchBankDetails(@PathVariable int id) {
        return bankDetailsService.getBankDetailsById(id);
    }

    @GetMapping("/search")
    public List<BankDetails> getBankDetails() {
        return bankDetailsService.getAllBankDetails();
    }


}
