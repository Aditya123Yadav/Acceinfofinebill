package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Restaurant;
import com.example.demo.Restaurantdto.Logindto;
import com.example.demo.Restaurantdto.Resregdto;
import com.example.demo.Security.JwtUtil;
import com.example.demo.Service.RestaurantService;

@RestController
@CrossOrigin
public class RestaurantContoller {

    @Autowired
    private RestaurantService restaurantService;

    // @Autowired
    // private AuthenticationManager authenticationManager;

    // @Autowired
    // private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/Restaurants")
    public List<Restaurant> getRestaurants() {
        return restaurantService.getAllRestaurants();

    }

    @GetMapping("/Restaurant{id}")

    public Optional<Restaurant> resById(@PathVariable("id") Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @PostMapping("/NewRestaurant")
    public ResponseEntity<Restaurant> registerRestaurant(@RequestBody Resregdto resDto) {
        try {
            Restaurant restaurant = restaurantService.registerRestaurant(resDto);
            return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Logindto loginDto) throws Exception {
        try {
            Restaurant restaurant = restaurantService.login(loginDto);
            final UserDetails userDetails = restaurantService.loadUserByUsername(restaurant.getUsername());

            final String jwt = jwtUtil.generateToken(userDetails, restaurant.getUsername(), restaurant.getId());

            String restaurantName = jwtUtil.extractUsername(jwt);
            System.out.println("Restaurant Name from JWT: " + restaurantName);

            Long restaurantId = jwtUtil.extractRestaurantId(jwt);
            System.out.println("Restaurant ID from JWT: " + restaurantId);

            // System.out.println(jwtUtil.generateToken(restaurant_id));
            return new ResponseEntity<>(jwt, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody Logindto loginDto) {
    // try {
    // Restaurant restaurant = restaurantService.login(loginDto);
    // return new ResponseEntity<>(restaurant, HttpStatus.OK);
    // } catch (RuntimeException e) {
    // return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    // }
    // }

}
