package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.City;
import com.inventory.store.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController implements CommonController {

    @Autowired
    private CityService cityService;

    @PostMapping("/add")
    public void addCity(@RequestBody  City city) {
        cityService.addCity(city);
    }

    @GetMapping("/search")
    public List<City> getAllCity() {
        return cityService.getAllCity();
    }

}
