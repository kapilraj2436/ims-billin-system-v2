package com.inventory.store.service;

import com.inventory.store.model.City;
import com.inventory.store.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public City getCityById(int cityId) {
        return cityRepository.findCityByCityId(cityId);
    }

    public City addCity(City city) {
        return cityRepository.save(city);
    }


    public List<City> getAllCity() {
        return cityRepository.findAll();
    }
}
