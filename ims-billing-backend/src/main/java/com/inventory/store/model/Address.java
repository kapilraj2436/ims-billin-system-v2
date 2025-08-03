package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Entity
@Table(name = "inv_address")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addressId")
    private int addressId;
    @Column(name = "addressString1")
    private String addressString1;
    @Column(name = "addressString2")
    private String addressString2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cityId")  // Only required if column is not named "cityId"
    private City city;

    public Address(int customerAddressId) {
        this.addressId = customerAddressId;
    }
}
