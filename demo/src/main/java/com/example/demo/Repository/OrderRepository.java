package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Model.Order;
import com.example.demo.Model.Restaurant;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByRestaurant(Restaurant restaurant);
}
