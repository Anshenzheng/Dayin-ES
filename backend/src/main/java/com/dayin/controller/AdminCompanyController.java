package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.entity.CompanyInfo;
import com.dayin.entity.CorporateCulture;
import com.dayin.entity.Honor;
import com.dayin.repository.CompanyInfoRepository;
import com.dayin.repository.CorporateCultureRepository;
import com.dayin.repository.HonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminCompanyController {

    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    @Autowired
    private CorporateCultureRepository corporateCultureRepository;

    @Autowired
    private HonorRepository honorRepository;

    @GetMapping("/company-info")
    public ApiResponse<CompanyInfo> getCompanyInfo() {
        List<CompanyInfo> list = companyInfoRepository.findAll();
        if (!list.isEmpty()) {
            return ApiResponse.success(list.get(0));
        }
        return ApiResponse.success(null);
    }

    @PostMapping("/company-info")
    public ApiResponse<CompanyInfo> saveCompanyInfo(@RequestBody CompanyInfo info) {
        try {
            CompanyInfo saved = companyInfoRepository.save(info);
            return ApiResponse.success("保存成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("保存失败: " + e.getMessage());
        }
    }

    @GetMapping("/corporate-culture")
    public ApiResponse<List<CorporateCulture>> getCorporateCulture() {
        return ApiResponse.success(corporateCultureRepository.findAllByOrderBySortOrderAsc());
    }

    @PostMapping("/corporate-culture")
    public ApiResponse<CorporateCulture> createCorporateCulture(@RequestBody CorporateCulture culture) {
        try {
            CorporateCulture saved = corporateCultureRepository.save(culture);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/corporate-culture/{id}")
    public ApiResponse<CorporateCulture> updateCorporateCulture(@PathVariable Long id, @RequestBody CorporateCulture culture) {
        return corporateCultureRepository.findById(id)
                .map(existing -> {
                    existing.setType(culture.getType());
                    existing.setTitle(culture.getTitle());
                    existing.setContent(culture.getContent());
                    existing.setSortOrder(culture.getSortOrder());
                    CorporateCulture saved = corporateCultureRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("记录不存在"));
    }

    @DeleteMapping("/corporate-culture/{id}")
    public ApiResponse<Void> deleteCorporateCulture(@PathVariable Long id) {
        try {
            corporateCultureRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    @GetMapping("/honors")
    public ApiResponse<List<Honor>> getHonors() {
        return ApiResponse.success(honorRepository.findAllByOrderBySortOrderAsc());
    }

    @PostMapping("/honors")
    public ApiResponse<Honor> createHonor(@RequestBody Honor honor) {
        try {
            Honor saved = honorRepository.save(honor);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/honors/{id}")
    public ApiResponse<Honor> updateHonor(@PathVariable Long id, @RequestBody Honor honor) {
        return honorRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(honor.getTitle());
                    existing.setDescription(honor.getDescription());
                    existing.setImageUrl(honor.getImageUrl());
                    existing.setIssueDate(honor.getIssueDate());
                    existing.setSortOrder(honor.getSortOrder());
                    Honor saved = honorRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("记录不存在"));
    }

    @DeleteMapping("/honors/{id}")
    public ApiResponse<Void> deleteHonor(@PathVariable Long id) {
        try {
            honorRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }
}
