package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
// import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.example.demo.Model.FoodItems;
import com.example.demo.Model.Restaurant;
// import com.example.demo.Model.Restaurant;
// import com.example.demo.Model.Restaurant;
import com.example.demo.Repository.FoodRepository;
// import com.example.demo.Repository.RestaurantRepository;
// import com.example.demo.Restaurantdto.Resregdto;
import com.example.demo.Repository.RestaurantRepository;

import jakarta.transaction.Transactional;

// import jakarta.transaction.Transactional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<FoodItems> getAllFoods() {
        return foodRepository.findAll();
    }

    public Optional<FoodItems> searchedfood(Long f_id) {
        return foodRepository.findById(f_id);

    }

    @Transactional
    public FoodItems addFoodItem(FoodItems foodItem, Restaurant restaurant) {
        // Ensure the foodItem's restaurants list is initialized
        if (foodItem.getRestaurant() == null) {
            foodItem.setRestaurant(new ArrayList<>());
        }

        // Add the logged-in restaurant to the food item
        foodItem.getRestaurant().add(restaurant);

        // Ensure the restaurant's foodItems list is initialized
        if (restaurant.getFoodItems() == null) {
            restaurant.setFoodItems(new ArrayList<>());
        }

        // Add the food item to the restaurant's list of food items
        restaurant.getFoodItems().add(foodItem);

        // Save the updated restaurant and food item entities
        restaurantRepository.save(restaurant); // Save the restaurant with the new food item
        return foodRepository.save(foodItem); // Save the food item with the associated restaurant
    }

    // @Transactional
    // public FoodItems addFoodItem(FoodItems foodItems) {

    // foodItems.setFName(foodItems.getFName());
    // foodItems.setCategory(foodItems.getCategory());
    // foodItems.setPrice(foodItems.getPrice());
    // return foodRepository.save(foodItems);
    // }

    // public Optional<List<FoodItems>> getFoodC(String category) {
    // return Optional.ofNullable(foodRepository.findByCategory(category));
    // }

    public List<FoodItems> getFoodByCategoryForRestaurant(String category, String username) {
        // Fetch the food items by category and restaurant's username
        return foodRepository.findByCategoryAndRestaurantUsername(category, username);
    }

    public void deleteFoodItem(Long id) {
        foodRepository.deleteById(id);

    }

    // public List<String> getCategories() {
    // return foodRepository.findAll()
    // .stream()
    // .map(FoodItems::getCategory)
    // .distinct()
    // .collect(Collectors.toList());
    // }

    public List<String> getCategoriesForRestaurant(String username) {
        // Fetch the food items by restaurant's username and map to categories
        return foodRepository.findCategoriesByRestaurantUsername(username)
                .stream()
                .distinct()
                .collect(Collectors.toList());
    }

    // Method to get items by category
    public List<FoodItems> getItemsByCategory(String category) {
        return foodRepository.findByCategory(category);
    }

}
