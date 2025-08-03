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
@Table(name = "inv_Payments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId")
    private int paymentId;
    @Column(name = "amount")
    private String amount;
    @Column(name = "paymentDate")
    private String paymentDate;
    @Column(name = "invoiceId")
    private String invoiceId;
    @Column(name = "paymentMethod")
    private String paymentMethod;
    @Column(name = "paymentStatus")
    private String paymentStatus;
    @Column(name = "paymentReceivedBy")
    private String paymentReceivedBy;
    @Column(name = "transactionId")
    private String transactionId;

    public Payments(int paymentId) {
        this.paymentId=paymentId;
    }
}
