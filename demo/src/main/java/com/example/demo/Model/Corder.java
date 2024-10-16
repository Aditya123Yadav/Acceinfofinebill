// package com.example.demo.Model;

// import java.util.List;
// import java.util.Set;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToMany;
// import jakarta.persistence.OneToMany;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Getter
// @Setter
// @Data
// @AllArgsConstructor
// @NoArgsConstructor

// @Entity
// public class Corder {

// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long order_id;

// private String restaurantName;
// private String restaurantAddress;
// private double subtotal;
// private double gstAmount;
// private double totalAmount;

// // @ManyToMany(mappedBy = "corder")
// // private Set<Restaurant> restaurant;

// @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
// @JoinColumn(name = "order_id")
// private List<CorderItem> items;

// }
