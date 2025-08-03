package com.inventory.store.service;

import com.inventory.store.model.Product;
import com.inventory.store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void addProduct(Product product) {
        productRepository.save(product);
    }
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(int productId) {
        return productRepository.findProductByProductId(productId);
    }

    public void updateProduct(int productId, Product product) {
        productRepository.save(product);
    }

}
