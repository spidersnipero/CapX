package com.example.demo.service;

import com.example.demo.dao.InvestmentDao;
import com.example.demo.models.Investment;
import com.example.demo.models.InvestmentId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentService {

    private final InvestmentDao investmentDao;

    public InvestmentService(InvestmentDao investmentDao) {
        this.investmentDao = investmentDao;
    }

    public List<Investment> getInvestmentsByUserId(Long userId) {
        return investmentDao.findByIdUserId(userId);
    }

    public Investment getInvestment(Long userId, String stockSymbol) {
        return investmentDao.findByIdUserIdAndIdStockSymbol(userId, stockSymbol);
    }

    public Investment saveInvestment(Investment investment) {
        return investmentDao.save(investment);
    }

    public void deleteInvestment(Long userId, String stockSymbol) {
        InvestmentId id = new InvestmentId(userId, stockSymbol);
        investmentDao.deleteById(id);
    }
}

