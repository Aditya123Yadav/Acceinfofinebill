package com.example.demo.Repository;

import java.util.List;
// import java.util.Optional;
// import java.util.Set;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.FoodItems;
import com.example.demo.Model.Restaurant;

public interface FoodRepository extends JpaRepository<FoodItems, Long> {
    List<FoodItems> findByCategory(String category);

    FoodItems deleteById(long f_id);

    List<FoodItems> findByRestaurant(Restaurant restaurant);

    @Query("SELECT DISTINCT f.category FROM FoodItems f JOIN f.restaurant r WHERE r.username = :username")
    List<String> findCategoriesByRestaurantUsername(@Param("username") String username);

    @Query("SELECT f FROM FoodItems f JOIN f.restaurant r WHERE f.category = :category AND r.username = :username")
    List<FoodItems> findByCategoryAndRestaurantUsername(@Param("category") String category,
            @Param("username") String username);
}
