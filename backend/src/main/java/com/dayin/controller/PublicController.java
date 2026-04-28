package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.entity.*;
import com.dayin.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    @Autowired
    private CorporateCultureRepository corporateCultureRepository;

    @Autowired
    private HonorRepository honorRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ApplicationScenarioRepository applicationScenarioRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @GetMapping("/company-info")
    public ApiResponse<CompanyInfo> getCompanyInfo() {
        List<CompanyInfo> list = companyInfoRepository.findAll();
        if (!list.isEmpty()) {
            return ApiResponse.success(list.get(0));
        }
        return ApiResponse.success(null);
    }

    @GetMapping("/corporate-culture")
    public ApiResponse<List<CorporateCulture>> getCorporateCulture() {
        return ApiResponse.success(corporateCultureRepository.findAllByOrderBySortOrderAsc());
    }

    @GetMapping("/honors")
    public ApiResponse<List<Honor>> getHonors() {
        return ApiResponse.success(honorRepository.findAllByOrderBySortOrderAsc());
    }

    @GetMapping("/product-categories")
    public ApiResponse<List<ProductCategory>> getProductCategories() {
        return ApiResponse.success(productCategoryRepository.findAllByOrderBySortOrderAsc());
    }

    @GetMapping("/products")
    public ApiResponse<List<Product>> getProducts(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            ProductCategory category = productCategoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                return ApiResponse.success(productRepository.findByCategoryAndStatusOrderBySortOrderAsc(category, Product.ProductStatus.active));
            }
        }
        return ApiResponse.success(productRepository.findByStatusOrderBySortOrderAsc(Product.ProductStatus.active));
    }

    @GetMapping("/products/{id}")
    public ApiResponse<Product> getProductDetail(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ApiResponse.success(product))
                .orElse(ApiResponse.error("产品不存在"));
    }

    @GetMapping("/products/{id}/images")
    public ApiResponse<List<ProductImage>> getProductImages(@PathVariable Long id) {
        return ApiResponse.success(productImageRepository.findByProductIdOrderBySortOrderAsc(id));
    }

    @GetMapping("/application-scenarios")
    public ApiResponse<List<ApplicationScenario>> getApplicationScenarios() {
        return ApiResponse.success(applicationScenarioRepository.findAllByOrderBySortOrderAsc());
    }

    @GetMapping("/news")
    public ApiResponse<List<News>> getPublishedNews() {
        return ApiResponse.success(newsRepository.findByStatusOrderByPublishDateDesc(News.NewsStatus.published));
    }

    @GetMapping("/news/{id}")
    public ApiResponse<News> getNewsDetail(@PathVariable Long id) {
        return newsRepository.findById(id)
                .map(news -> {
                    news.setViews(news.getViews() + 1);
                    newsRepository.save(news);
                    return ApiResponse.success(news);
                })
                .orElse(ApiResponse.error("新闻不存在"));
    }

    @GetMapping("/contact-info")
    public ApiResponse<ContactInfo> getContactInfo() {
        List<ContactInfo> list = contactInfoRepository.findAll();
        if (!list.isEmpty()) {
            return ApiResponse.success(list.get(0));
        }
        return ApiResponse.success(null);
    }

    @PostMapping("/contact-message")
    public ApiResponse<ContactMessage> createContactMessage(@RequestBody ContactMessage message) {
        try {
            ContactMessage saved = contactMessageRepository.save(message);
            return ApiResponse.success("留言提交成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("提交失败: " + e.getMessage());
        }
    }
}
