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
@Table(name = "INV_Payment_Status")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PaymentStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentStatusId")
    private int paymentStatusId;
    @Column(name = "paymentStatusName")
    private String paymentStatusName;
    @Column(name = "description")
    private String description;

    public PaymentStatus(int paymentStatusId) {
        this.paymentStatusId = paymentStatusId;
    }
}
