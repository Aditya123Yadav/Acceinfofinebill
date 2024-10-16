package com.example.demo.Restaurantdto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Logindto {
    // @Column(unique = true)
    private String username;

    private String password;

    // private boolean enabled = true;

}
