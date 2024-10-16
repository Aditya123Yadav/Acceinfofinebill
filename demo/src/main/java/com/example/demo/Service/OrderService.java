package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Model.Order;
import com.example.demo.Repository.OrderRepository;
import com.example.demo.Repository.RestaurantRepository;
import com.example.demo.Model.OrderItem;
import com.example.demo.Model.Restaurant;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    // Method to save the order
    public Order saveOrder(Order order) {

        order.setDate(LocalDateTime.now());

        List<OrderItem> items = order.getItems();
        for (OrderItem item : items) {
            item.setOrder(order);
        }

        return orderRepository.save(order);
    }

    // Method to fetch order by ID
    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    // Method to fetch all orders for a specific restaurant by username
    public List<Order> getAllOrdersForRestaurant(String username) {
        // Fetch the restaurant by its username
        Restaurant restaurant = restaurantRepository.findByUsername(username);

        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found");
        }

        // Fetch all orders for the restaurant
        return orderRepository.findByRestaurant(restaurant);
    }

    // Order order = new Order();
    // order.setDate(LocalDateTime.now());

}
