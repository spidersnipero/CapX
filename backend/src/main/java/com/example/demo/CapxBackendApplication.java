package com.example.demo;

import com.example.demo.dao.InvestmentDao;
import com.example.demo.dao.UserRepository;
import com.example.demo.models.Investment;
import com.example.demo.models.InvestmentId;
import com.example.demo.models.User;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CapxBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CapxBackendApplication.class, args);
    }

    // Register CommandLineRunner as a Bean
    @Bean
    CommandLineRunner initializeUsers(UserRepository userRepository, InvestmentDao investmentDao) {
        return args -> {
            // Check if the table is empty
            if (userRepository.count() == 0) {
                // Create and save the user "John"
                User john = new User(null, "John");
                userRepository.save(john);
                System.out.println("User 'John' has been added to the database.");
            } else {
                System.out.println("Users 'Jhon' exist in the database. No new user added.");
            }
			// 
            investmentDao.deleteAll();
            List<Investment> investments = List.of(
                new Investment(new InvestmentId(1L, "AAPL"), 200.5, 1),
                new Investment(new InvestmentId(1L, "GOOGL"), 270.3, 1),
                new Investment(new InvestmentId(1L, "MSFT"), 482.35, 1),
                new Investment(new InvestmentId(1L, "AMZN"), 180.0, 1),
                new Investment(new InvestmentId(1L, "TSLA"), 352.2, 1)
            );
            investmentDao.saveAll(investments);
            System.out.println("Investments with bought prices have been added to the database.");


        };
    }
}
