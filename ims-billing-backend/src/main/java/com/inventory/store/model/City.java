package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "inv_city")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cityId")
    private int cityId;
    @Column(name = "cityName")
    private String cityName;
    @Column(name = "cityPinCode")
    private String cityPinCode;
    @Column(name = "cityDescription")
    private String cityDescription;


}
