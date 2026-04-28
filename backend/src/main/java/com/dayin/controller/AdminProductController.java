package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.entity.Product;
import com.dayin.entity.ProductCategory;
import com.dayin.entity.ProductImage;
import com.dayin.repository.ProductCategoryRepository;
import com.dayin.repository.ProductImageRepository;
import com.dayin.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminProductController {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @GetMapping("/product-categories")
    public ApiResponse<List<ProductCategory>> getCategories() {
        return ApiResponse.success(productCategoryRepository.findAllByOrderBySortOrderAsc());
    }

    @PostMapping("/product-categories")
    public ApiResponse<ProductCategory> createCategory(@RequestBody ProductCategory category) {
        try {
            ProductCategory saved = productCategoryRepository.save(category);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/product-categories/{id}")
    public ApiResponse<ProductCategory> updateCategory(@PathVariable Long id, @RequestBody ProductCategory category) {
        return productCategoryRepository.findById(id)
                .map(existing -> {
                    existing.setName(category.getName());
                    existing.setDescription(category.getDescription());
                    existing.setSortOrder(category.getSortOrder());
                    ProductCategory saved = productCategoryRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("分类不存在"));
    }

    @DeleteMapping("/product-categories/{id}")
    public ApiResponse<Void> deleteCategory(@PathVariable Long id) {
        try {
            productCategoryRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    @GetMapping("/products")
    public ApiResponse<List<Product>> getProducts(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            ProductCategory category = productCategoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                return ApiResponse.success(productRepository.findByCategoryOrderBySortOrderAsc(category));
            }
        }
        return ApiResponse.success(productRepository.findAll());
    }

    @GetMapping("/products/{id}")
    public ApiResponse<Product> getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ApiResponse.success(product))
                .orElse(ApiResponse.error("产品不存在"));
    }

    @PostMapping("/products")
    public ApiResponse<Product> createProduct(@RequestBody Product product) {
        try {
            if (product.getCategoryId() != null) {
                ProductCategory category = productCategoryRepository.findById(product.getCategoryId()).orElse(null);
                product.setCategory(category);
            }
            Product saved = productRepository.save(product);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/products/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(product.getName());
                    existing.setDescription(product.getDescription());
                    existing.setSpecifications(product.getSpecifications());
                    existing.setMainImageUrl(product.getMainImageUrl());
                    existing.setSortOrder(product.getSortOrder());
                    existing.setStatus(product.getStatus());
                    if (product.getCategoryId() != null) {
                        ProductCategory category = productCategoryRepository.findById(product.getCategoryId()).orElse(null);
                        existing.setCategory(category);
                    }
                    Product saved = productRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("产品不存在"));
    }

    @DeleteMapping("/products/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        try {
            productRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    @GetMapping("/products/{id}/images")
    public ApiResponse<List<ProductImage>> getProductImages(@PathVariable Long id) {
        return ApiResponse.success(productImageRepository.findByProductIdOrderBySortOrderAsc(id));
    }

    @PostMapping("/products/{id}/images")
    public ApiResponse<List<ProductImage>> saveProductImages(@PathVariable Long id, @RequestBody List<ProductImage> images) {
        try {
            productImageRepository.deleteByProductId(id);
            Product product = productRepository.findById(id).orElse(null);
            for (ProductImage image : images) {
                image.setProduct(product);
                productImageRepository.save(image);
            }
            return ApiResponse.success("保存成功", productImageRepository.findByProductIdOrderBySortOrderAsc(id));
        } catch (Exception e) {
            return ApiResponse.error("保存失败: " + e.getMessage());
        }
    }
}
