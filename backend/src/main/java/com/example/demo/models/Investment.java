package com.example.demo.models;


import org.springframework.lang.NonNull;

import jakarta.persistence.*;

@Entity
@Table(name = "investments")
public class Investment {

    @EmbeddedId
    private InvestmentId id;

    @NonNull
    private Double boughtPrice;

    @NonNull
    private Integer quantity;

    // Constructors
    public Investment() {}

    public Investment(InvestmentId id, Double boughtPrice, Integer quantity) {
        this.id = id;
        this.boughtPrice = boughtPrice;
        this.quantity = quantity;
    }

    // Getters and Setters
    public InvestmentId getId() {
        return id;
    }

    public void setId(InvestmentId id) {
        this.id = id;
    }

    public Double getBoughtPrice() {
        return boughtPrice;
    }

    public void setBoughtPrice(Double boughtPrice) {
        this.boughtPrice = boughtPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Investment{" +
                "id=" + id +
                ", boughtPrice=" + boughtPrice +
                ", quantity=" + quantity +
                '}';
    }
}
