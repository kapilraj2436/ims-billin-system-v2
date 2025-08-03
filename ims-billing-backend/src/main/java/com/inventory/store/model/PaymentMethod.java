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
@Table(name = "inv_payment_method")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentMethodId")
    private int paymentMethodId;
    @Column(name = "paymentMethod")
    private String paymentMethod;
    @Column(name = "description")
    private String description;


    public PaymentMethod(int paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }
}
