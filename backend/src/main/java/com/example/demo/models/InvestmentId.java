package com.example.demo.models;


import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class InvestmentId implements Serializable {

    private Long userId;

    private String stockSymbol;

    // Default constructor
    public InvestmentId() {}

    // Parameterized constructor
    public InvestmentId(Long userId, String stockSymbol) {
        this.userId = userId;
        this.stockSymbol = stockSymbol;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    // Equals and HashCode for composite key comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InvestmentId that = (InvestmentId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(stockSymbol, that.stockSymbol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, stockSymbol);
    }
}

