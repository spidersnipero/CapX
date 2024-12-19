package com.example.demo;

import com.example.demo.dao.UserRepository;
import com.example.demo.models.User;
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
    CommandLineRunner initializeUsers(UserRepository userRepository) {
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
        };
    }
}
