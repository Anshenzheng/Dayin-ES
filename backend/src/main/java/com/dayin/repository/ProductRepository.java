package com.dayin.repository;

import com.dayin.entity.Product;
import com.dayin.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryOrderBySortOrderAsc(ProductCategory category);
    List<Product> findByStatusOrderBySortOrderAsc(Product.ProductStatus status);
    List<Product> findByCategoryAndStatusOrderBySortOrderAsc(ProductCategory category, Product.ProductStatus status);
}
