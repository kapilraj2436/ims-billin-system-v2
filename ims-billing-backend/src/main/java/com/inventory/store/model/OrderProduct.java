package com.inventory.store.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "inv_order_product")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderProductId")
    private int orderProductId;

    @Column(name = "orderId")
    private int orderId;
    @Column(name = "productId")
    private Integer productId;
    @Column(name = "quantity")
    private Integer quantity;

}
