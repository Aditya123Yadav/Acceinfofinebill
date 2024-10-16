package com.example.demo.Controller;

import java.security.Principal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.FoodItems;
import com.example.demo.Model.Restaurant;
import com.example.demo.Repository.FoodRepository;
import com.example.demo.Security.JwtUtil;

import com.example.demo.Service.FoodService;
import com.example.demo.Service.RestaurantService;

@RestController
@CrossOrigin
public class FoodController {

    @Autowired
    public FoodService foodService;

    @Autowired
    public RestaurantService restaurantService;

    @Autowired
    public JwtUtil jwtUtil;

    @Autowired
    public FoodRepository foodRepository;

    @GetMapping("/allfoods")
    public ResponseEntity<?> getFoodItemsForRestaurant(Principal principal) {
        try {
            String loggedInUsername = principal.getName();
            Restaurant restaurant = restaurantService.findByUsername(loggedInUsername);

            if (restaurant == null) {
                return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
            }

            List<FoodItems> foodItems = restaurant.getFoodItems(); // Fetch only food items associated with the
                                                                   // logged-in restaurant
            return new ResponseEntity<>(foodItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @PostMapping("/add")
    // public ResponseEntity<?> add(@RequestBody FoodItems foodItem) {
    // try {
    // // Add the food item
    // FoodItems newFoodItem = foodService.addFoodItem(foodItem);
    // return new ResponseEntity<>(newFoodItem, HttpStatus.CREATED);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody FoodItems foodItem, Principal principal) {
        try {
            // Get the logged-in restaurant's username
            String loggedInUsername = principal.getName();

            // Fetch the restaurant entity by username
            Restaurant restaurant = restaurantService.findByUsername(loggedInUsername);
            if (restaurant == null) {
                return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
            }

            // Associate the food item with the logged-in restaurant
            FoodItems newFoodItem = foodService.addFoodItem(foodItem, restaurant);

            return new ResponseEntity<>(newFoodItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        foodService.deleteFoodItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // @GetMapping("/FoodByCat/{category}")
    // public Optional<List<FoodItems>> foodbycategory(@PathVariable("category")
    // String category) {
    // return foodService.getFoodC(category);

    // }

    @GetMapping("/FoodByCat/{category}")
    public ResponseEntity<List<FoodItems>> getFoodByCategoryForRestaurant(@PathVariable("category") String category,
            Principal principal) {
        try {
            // Get the logged-in restaurant's username
            String loggedInUsername = principal.getName();

            // Fetch the food items by category for the logged-in restaurant
            List<FoodItems> foodItems = foodService.getFoodByCategoryForRestaurant(category, loggedInUsername);

            return ResponseEntity.ok(foodItems);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to fetch all categories
    // @GetMapping("/categories")
    // public ResponseEntity<List<String>> getCategories() {
    // List<String> categories = foodService.getCategories();
    // return ResponseEntity.ok(categories);
    // }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategoriesForRestaurant(Principal principal) {
        try {
            // Get the logged-in restaurant's username
            String loggedInUsername = principal.getName();

            // Fetch the categories associated with the logged-in restaurant
            List<String> categories = foodService.getCategoriesForRestaurant(loggedInUsername);

            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to fetch items by category
    @GetMapping("/items/{category}")
    public ResponseEntity<List<FoodItems>> getItemsByCategory(@PathVariable String category) {
        List<FoodItems> items = foodService.getItemsByCategory(category);
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(items);

    }

}
