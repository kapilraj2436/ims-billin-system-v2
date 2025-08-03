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
@Table(name = "inv_discount")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountId")
    private int discountId;
    @Column(name = "discountName")
    private String discountName;
    @Column(name = "discountValue")
    private String discountValue;
    @Column(name = "discountDescription")
    private String discountDescription;


    public Discount(int discountId) {
        this.discountId = discountId;
    }
}
