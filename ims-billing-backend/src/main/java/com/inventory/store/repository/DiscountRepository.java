package com.inventory.store.repository;

import com.inventory.store.model.Customer;
import com.inventory.store.model.Discount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;


@Repository
public interface DiscountRepository extends JpaRepository<Discount,Integer> {
    Discount findDiscountByDiscountId(Integer discountId);
}
