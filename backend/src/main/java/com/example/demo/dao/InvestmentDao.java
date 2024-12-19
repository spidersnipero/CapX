package com.example.demo.dao;


import com.example.demo.models.Investment;
import com.example.demo.models.InvestmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentDao extends JpaRepository<Investment, InvestmentId> {

    // Find all investments by userId
    List<Investment> findByIdUserId(Long userId);

    // Find an investment by userId and stockSymbol
    Investment findByIdUserIdAndIdStockSymbol(Long userId, String stockSymbol);
}

