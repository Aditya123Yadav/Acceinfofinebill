package com.example.demo.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Order;
import com.example.demo.Model.Restaurant;
import com.example.demo.Security.JwtUtil;
import com.example.demo.Service.OrderService;
import com.example.demo.Service.RestaurantService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/bills")
    public ResponseEntity<?> saveOrder(@RequestBody Order order) {
        String username = order.getRestaurantName(); // Assuming restaurantName stores the username
        Restaurant restaurant = restaurantService.findByUsername(username); // Fetch the Restaurant entity by username

        if (restaurant == null) {
            return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
        }

        order.setRestaurant(restaurant); // Set the restaurant in the order

        // Proceed with saving the order
          order.setDate(LocalDateTime.now());
        orderService.saveOrder(order);
        return ResponseEntity.ok("Order saved successfully");
    }

    // @PostMapping("/bills")
    // public ResponseEntity<String> saveOrder(@RequestBody Order order) {
    // try {
    // // Log the incoming order data
    // System.out.println("Received order: " + order);

    // // Log the restaurant ID being fetched
    // Long restaurantId = order.getRestaurant().getId();
    // System.out.println("Fetching restaurant with ID: " + restaurantId);

    // // Fetch the restaurant and check if it exists
    // Restaurant restaurant = restaurantService.findById(restaurantId);
    // if (restaurant == null) {
    // System.out.println("Restaurant not found with ID: " + restaurantId);
    // return ResponseEntity.status(404).body("Restaurant not found");
    // }

    // // Set restaurant for the order
    // order.setRestaurant(restaurant);

    // // Log the order before saving
    // System.out.println("Saving order: " + order);

    // // Save the order (service will handle linking OrderItems)
    // orderService.saveOrder(order);

    // return ResponseEntity.ok("Order saved successfully");
    // } catch (Exception e) {
    // e.printStackTrace(); // Log the exception for debugging
    // return ResponseEntity.status(500).body("Failed to save order: " +
    // e.getMessage());
    // }
    // }

    // @PostMapping("/save")
    // public ResponseEntity<?> saveOrder(@RequestBody Order order,
    // @RequestHeader("Authorization") String token) {
    // String jwtToken = token.substring(7); // Remove "Bearer " prefix
    // Long restaurantId = jwtUtil.extractRestaurantId(jwtToken); // Extract
    // restaurantId from the token

    // Restaurant restaurant = restaurantService.findById(restaurantId);
    // order.setRestaurant(restaurant);
    // orderService.saveOrder(order);

    // return ResponseEntity.ok("Order saved successfully");
    // }

    // API to fetch an order by ID (optional)
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.findOrderById(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    // @GetMapping("/allbills")
    // public ResponseEntity<List<Order>> getAllOrdersForRestaurant(@RequestParam
    // String username) {
    // try {
    // // Fetch all orders for the restaurant using the username
    // List<Order> orders = orderService.getAllOrdersForRestaurant(username);

    // // If no orders are found, return a 404 status
    // if (orders.isEmpty()) {
    // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }

    // // Return the list of orders with 200 OK status
    // return new ResponseEntity<>(orders, HttpStatus.OK);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @GetMapping("/allbills")
    public ResponseEntity<List<Order>> getAllOrdersForRestaurant(HttpServletRequest request) {
        try {
            // Extract the JWT token from the Authorization header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            // Extract the token and fetch the username from the token
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token); // Assuming you have a method to extract the username from
                                                              // the token

            // Fetch all orders for the restaurant using the username
            List<Order> orders = orderService.getAllOrdersForRestaurant(username);

            // If no orders are found, return a 204 NO CONTENT status
            if (orders.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            // Return the list of orders with 200 OK status
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
