package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Table(name = "inv_product")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private int productId;
    @Column(name = "productName")
    private String productName;
    @Column(name = "productDescription")
    private String productDescription;
    @Column(name = "pricePerUnit")
    private double pricePerUnit;
    @Column(name = "availableQuantity")
    private int availableQuantity;

    @Transient // not mapped to DB
    private Integer orderQuantity;

}
