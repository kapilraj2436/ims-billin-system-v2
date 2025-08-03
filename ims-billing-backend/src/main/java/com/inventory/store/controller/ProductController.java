package com.inventory.store.controller;

import com.inventory.store.common.CommonController;
import com.inventory.store.model.Product;
import com.inventory.store.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController implements CommonController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @GetMapping("/search")
    public List<Product> getAllProduct() {
        log.info("product searching....");
        return productService.getAllProducts();
    }

    @GetMapping("/search/{productId}")
    public Product getProductById(@PathVariable int productId) {
        return productService.getProduct(productId);
    }

    @PostMapping("/update/{productId}")
    public void updateProductById(@PathVariable int productId, @RequestBody Product product) {
        productService.updateProduct(productId, product);
    }



}
