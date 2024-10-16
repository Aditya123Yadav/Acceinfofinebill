package com.example.demo.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Service
public class JwtUtil {

    // private String SECRET_KEY = "8fY4hK38mNfpJq27rVxZ8tL7XwS6ggQ";
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Encode the key to a Base64 string
    String SECRET_KEY = java.util.Base64.getEncoder().encodeToString(key.getEncoded());

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Extract restaurantId from the JWT token
    // public Long extractRestaurantId(String token) {
    // Claims claims = extractAllClaims(token);
    // return Long.parseLong(claims.get("restaurantId").toString());
    // }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails, String restaurantName, Long restaurantId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("restaurantName", restaurantName);
        claims.put("restaurantId", restaurantId);

        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractRestaurantName(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("restaurantName", String.class);
    }

    public Long extractRestaurantId(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("restaurantId", Long.class);

    }
}