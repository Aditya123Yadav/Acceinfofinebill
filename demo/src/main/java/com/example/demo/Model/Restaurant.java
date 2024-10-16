
package com.example.demo.Model;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String gstNo;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "rest_food", joinColumns = @JoinColumn(name = "restaurantId", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "foodId", referencedColumnName = "f_id"))
    private List<FoodItems> foodItems;

    @OneToOne
    @JoinColumn(name = "invt_id", referencedColumnName = "i_id")
    private Inventory inventory;

    // @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // @JoinTable(name = "rest_order", joinColumns = @JoinColumn(name =
    // "restaurantId", referencedColumnName = "id"), inverseJoinColumns =
    // @JoinColumn(name = "order_id", referencedColumnName = "id"))
    // private List<Order> orders;

    // @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // @JoinTable(name = "rest_order", joinColumns = @JoinColumn(name =
    // "restaurant_id", referencedColumnName = "id"), // Restaurant
    // // ID
    // inverseJoinColumns = @JoinColumn(name = "order_id", referencedColumnName =
    // "id"))
    // private List<Order> orders;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

}
