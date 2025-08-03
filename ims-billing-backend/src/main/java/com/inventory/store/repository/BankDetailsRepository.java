package com.inventory.store.repository;

import com.inventory.store.model.Address;
import com.inventory.store.model.BankDetails;
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
public interface BankDetailsRepository extends JpaRepository<BankDetails, Integer> {
    BankDetails getBankDetailsByBankDetailsId(Integer bankDetailsId);
}
