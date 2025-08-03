package com.inventory.store.service;

import com.inventory.store.model.Address;
import com.inventory.store.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CityService cityService;

    public Address getAddressByCustomerId(int addressId) {
        Address address = addressRepository.findByAddressId(addressId);
        address.setCity(cityService.getCityById(address.getCity().getCityId()));
        return address;
    }

    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    public List<Address> getAllAddress() {
        List<Address> addresses = addressRepository.findAll();
        for (Address address : addresses) {
            address.setCity(cityService.getCityById(address.getCity().getCityId()));
        }
        return addresses;
    }
    public Address getAddressById(Integer addressId){
        return addressRepository.findByAddressId(addressId);
    }
}
