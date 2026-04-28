package com.dayin.service.impl;

import com.dayin.service.FileUploadService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${file.upload-path}")
    private String uploadPath;

    @Override
    public String uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("文件为空");
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            String newFilename = UUID.randomUUID().toString() + "." + extension;

            String datePath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            String fullPath = uploadPath + datePath;

            File directory = new File(fullPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            Path filePath = Paths.get(fullPath, newFilename);
            Files.copy(file.getInputStream(), filePath);

            return "/uploads/" + datePath + "/" + newFilename;
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败: " + e.getMessage());
        }
    }

    @Override
    public void deleteFile(String filePath) {
        if (filePath != null && filePath.startsWith("/uploads/")) {
            String actualPath = uploadPath + filePath.substring("/uploads/".length());
            File file = new File(actualPath);
            if (file.exists()) {
                file.delete();
            }
        }
    }
}
