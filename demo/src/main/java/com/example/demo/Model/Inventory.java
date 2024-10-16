package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;

// import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Entity

public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long i_id;

    String name;
    Long price;

    // @ManyToMany(mappedBy = "inventory")
    // private Set<Restaurant> restaurant;

    @OneToOne(mappedBy = "inventory")
    @JsonBackReference
    private Restaurant restaurant;

}
