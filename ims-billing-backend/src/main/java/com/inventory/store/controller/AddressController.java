package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.Address;
import com.inventory.store.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController implements CommonController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/add")
    public void addAddress(@RequestBody Address address) throws Exception {
        addressService.addAddress(address);
    }

    @PostMapping("/update")
    public void updateAddress(@RequestBody Address address) {

    }

    @PostMapping("delete")
    public void deleteAddress(@RequestBody Address address) {

    }

    @GetMapping("/search/{id}")
    public Address searchAddress(@PathVariable int id) {
        return addressService.getAddressById(id);
    }

    @GetMapping("/search")
    public List<Address> getAddress() {
        return addressService.getAllAddress();

    }

}
