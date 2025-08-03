package com.inventory.store.repository;

import com.inventory.store.model.PaymentStatus;
import com.inventory.store.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    Product findProductByProductId(Integer productId);
/*

    @Query(value = "select * from inv_product p Inner join inv_order_product iop " +
            "on p.productId=iop.productId where iop.orderId= :orderId", nativeQuery = true)
    List<Product> findProductByOrderId(int orderId);
*/

}