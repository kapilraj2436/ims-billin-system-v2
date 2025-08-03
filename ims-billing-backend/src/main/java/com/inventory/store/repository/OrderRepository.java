package com.inventory.store.repository;

import com.inventory.store.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    Order findOrderByOrderId(Integer orderId);

    List<Order> findByCustomer_CustomerId(Integer customerId);
}
