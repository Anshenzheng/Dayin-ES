package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    public ApiResponse<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filePath = fileUploadService.uploadFile(file);
            Map<String, String> result = new HashMap<>();
            result.put("url", filePath);
            return ApiResponse.success("上传成功", result);
        } catch (Exception e) {
            return ApiResponse.error("上传失败: " + e.getMessage());
        }
    }

    @PostMapping("/upload/multiple")
    public ApiResponse<Map<String, Object>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            Map<String, Object> result = new HashMap<>();
            java.util.List<String> urls = new java.util.ArrayList<>();

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String filePath = fileUploadService.uploadFile(file);
                    urls.add(filePath);
                }
            }

            result.put("urls", urls);
            return ApiResponse.success("上传成功", result);
        } catch (Exception e) {
            return ApiResponse.error("上传失败: " + e.getMessage());
        }
    }
}
