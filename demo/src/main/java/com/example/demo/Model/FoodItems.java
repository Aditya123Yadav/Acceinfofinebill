// package com.example.demo.Model;

// import java.util.Set;

// import jakarta.persistence.Column;

// // import org.hibernate.id.factory.internal.AutoGenerationTypeStrategy;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToMany;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Setter
// @Getter
// @NoArgsConstructor
// @AllArgsConstructor
// @Data
// @Entity
// public class FoodItems {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     Long f_id;

//     @Column(nullable = false)
//     String fName;

//     @Column(nullable = false)
//     String category;

//     @Column(nullable = false)
//     Long price;

//     @ManyToMany(mappedBy = "foodItems")
//     private Set<Restaurant> restaurant;

// }

package com.example.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Setter
// @Getter
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// public class FoodItems {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long f_id;

//     @Column(nullable = false)
//     private String fName;

//     @Column(nullable = false)
//     private String category;

//     @Column(nullable = false)
//     private Long price;

//     @ManyToMany(mappedBy = "foodItems")
//     @JsonBackReference
//     private List<Restaurant> restaurant;
// }

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long f_id;

    @Column(nullable = false)
    private String fName;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Long price;

    @ManyToMany(mappedBy = "foodItems")
    @JsonIgnore // Ignore the back reference to avoid circular serialization issues
    private List<Restaurant> restaurant;
}
