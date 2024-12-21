package com.example.demo.controller;

import com.example.demo.models.Investment;
import com.example.demo.service.InvestmentService;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    // Create a new investment
    @PostMapping
    public ResponseEntity<Investment> createInvestment(@RequestBody Investment investment) {
        System.out.println(investment.toString());
        try {
            Investment investmentExist = investmentService.getInvestment(investment.getId().getUserId(), investment.getId().getStockSymbol());
        if (investmentExist != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Company already exists for userId: " + investment.getId().getUserId() + " and stockSymbol: " + investment.getId().getStockSymbol()
            );
        }
            Investment savedInvestment = investmentService.saveInvestment(investment);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedInvestment);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error creating investment", e);
        }
    }

    // Get all investments by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Investment>> getInvestmentsByUser(@PathVariable Long userId) {
        List<Investment> investments = investmentService.getInvestmentsByUserId(userId);
        return ResponseEntity.ok(investments);
    }

    // Get a specific investment by userId and stockSymbol
    @GetMapping("/{userId}/{stockSymbol}")
    public ResponseEntity<Investment> getInvestment(
            @PathVariable Long userId,
            @PathVariable String stockSymbol) {
        Investment investment = investmentService.getInvestment(userId, stockSymbol);
        if (investment == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Investment not found for userId: " + userId + " and stockSymbol: " + stockSymbol
            );
        }
        return ResponseEntity.ok(investment);
    }

    // Update an investment
    @PutMapping("/{userId}/{stockSymbol}")
    public ResponseEntity<Investment> updateInvestment(
            @PathVariable Long userId,
            @PathVariable String stockSymbol,
            @RequestBody Investment investmentDetails) {
        try {
            Investment existingInvestment = investmentService.getInvestment(userId, stockSymbol);
            if (existingInvestment == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Investment not found for userId: " + userId + " and stockSymbol: " + stockSymbol
                );
            }
            existingInvestment.setBoughtPrice(investmentDetails.getBoughtPrice());
            existingInvestment.setQuantity(investmentDetails.getQuantity());
            Investment updatedInvestment = investmentService.saveInvestment(existingInvestment);
            return ResponseEntity.ok(updatedInvestment);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error updating investment", e);
        }
    }

    // Delete an investment
    @DeleteMapping("/{userId}/{stockSymbol}")
    public ResponseEntity<Void> deleteInvestment(
            @PathVariable Long userId,
            @PathVariable String stockSymbol) {
        Investment existingInvestment = investmentService.getInvestment(userId, stockSymbol);
        if (existingInvestment == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Investment not found for userId: " + userId + " and stockSymbol: " + stockSymbol
            );
        }
        try {
            investmentService.deleteInvestment(userId, stockSymbol);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting investment", e);
        }
    }
}
