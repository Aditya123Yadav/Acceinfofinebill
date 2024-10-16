package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.Model.Restaurant;
import com.example.demo.Repository.RestaurantRepository;
import com.example.demo.Restaurantdto.Logindto;
import com.example.demo.Restaurantdto.Resregdto;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class RestaurantService implements UserDetailsService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // @Autowired
    // private JwtUtil jwtUtil;

    // @Autowired
    // private HttpSession httpSession;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    public Restaurant findByUsername(String username) {
        return restaurantRepository.findByUsername(username);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant findById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    @Transactional
    public Restaurant registerRestaurant(Resregdto resDto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setUsername(resDto.getUsername());
        restaurant.setPassword(resDto.getPassword());
        restaurant.setGstNo(resDto.getGstNo());

        return restaurantRepository.save(restaurant);
    }

    public Restaurant login(Logindto loginDto) {
        // Fetch the restaurant by username
        Restaurant restaurant = restaurantRepository.findByUsername(loginDto.getUsername());

        if (restaurant == null) {
            throw new IllegalArgumentException("Username not found");
        }

        // Compare the provided password with the stored password
        if (restaurant.getPassword().equals(loginDto.getPassword())) {
            System.out.println("Login Successfully");
            return restaurant;
        } else {
            throw new IllegalArgumentException("Username or password mismatch");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Restaurant restaurant = restaurantRepository.findByUsername(username);
        if (restaurant == null) {
            throw new UsernameNotFoundException("Restaurant not found with username: " + username);
        }
        // You may want to return a custom UserDetails implementation
        return new org.springframework.security.core.userdetails.User(restaurant.getUsername(),
                restaurant.getPassword(), new ArrayList<>());
    }

}
