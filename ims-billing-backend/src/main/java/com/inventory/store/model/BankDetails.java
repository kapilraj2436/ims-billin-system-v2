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
@Table(name = "inv_bank_details")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BankDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bankDetailsId")
    private int bankDetailsId;

    @Column(name="bankName")
    private String bankName;
    @Column(name="accountNumber")
    private String accountNumber;
    @Column(name="ifscCode")
    private String ifscCode;
    @Column(name="branch")
    private String branch;
    @Column(name="ownerName")
    private String ownerName;
    @Column(name="description")
    private String description;


    public BankDetails(int bankDetailsId) {
        this.bankDetailsId = bankDetailsId;
    }
}
