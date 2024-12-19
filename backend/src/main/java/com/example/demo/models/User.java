package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;

    // constructor
    public User() {
    }
    public User(Long id,String name){
        this.id = id;
        this.name = name;
    }

    // setters

    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

    // getters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString(){
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
