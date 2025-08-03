package com.inventory.store.repository;

import com.inventory.store.model.PaymentMethod;
import com.inventory.store.model.PaymentStatus;
import com.inventory.store.model.Payments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public interface PaymentStatusRepository extends JpaRepository<PaymentStatus,Integer> {
    PaymentStatus findByPaymentStatusId(Integer paymentStatusId);
}