package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inv_order")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private int orderId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerId")
    private Customer customer;
    @Column(name = "hsnCode")
    private String hsnCode;

    @Column(name = "orderPrice")
    private BigDecimal orderPrice;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discountId")
    private Discount discount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentId")
    private Payments payment;

    @Transient
    private List<Product> products;
}
