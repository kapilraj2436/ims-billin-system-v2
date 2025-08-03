package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "inv_customer")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerId")
    private Integer customerId;
    @Column(name = "customerName")
    private String customerName;
    @Column(name = "customerMobile")
    private String customerMobile;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "customerAddressId")
    private Address customerAddress;
    @Column(name = "gstinNumber")
    private String gstinNumber;

    public Customer() {
    }

    public Customer(int customerId) {
        this.customerId = customerId;
    }
}
