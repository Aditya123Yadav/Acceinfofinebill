// package com.example.demo.Controller;

// import java.util.List;

// // import org.hibernate.mapping.List;
// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;

// import org.springframework.web.bind.annotation.RestController;

// import com.example.demo.Model.Corder;
// import com.example.demo.Service.CorderService;

// @RestController
// @CrossOrigin
// public class CorderController {

// @Autowired
// private CorderService corderService;

// @GetMapping("/Allorders")
// public ResponseEntity<List<Corder>> getAllOrders() {
// List<Corder> orders = corderService.getAllOrders();
// return ResponseEntity.ok(orders);
// }

// @PostMapping("/saveorder")
// public ResponseEntity<Corder> saveOrder(@RequestBody Corder order) {
// Corder savedOrder = corderService.saveOrder(order);
// return ResponseEntity.ok(savedOrder);
// }

// }
