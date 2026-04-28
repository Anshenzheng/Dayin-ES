package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.entity.ApplicationScenario;
import com.dayin.entity.ContactInfo;
import com.dayin.entity.ContactMessage;
import com.dayin.entity.News;
import com.dayin.repository.ApplicationScenarioRepository;
import com.dayin.repository.ContactInfoRepository;
import com.dayin.repository.ContactMessageRepository;
import com.dayin.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminContentController {

    @Autowired
    private ApplicationScenarioRepository applicationScenarioRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @GetMapping("/application-scenarios")
    public ApiResponse<List<ApplicationScenario>> getScenarios() {
        return ApiResponse.success(applicationScenarioRepository.findAllByOrderBySortOrderAsc());
    }

    @PostMapping("/application-scenarios")
    public ApiResponse<ApplicationScenario> createScenario(@RequestBody ApplicationScenario scenario) {
        try {
            ApplicationScenario saved = applicationScenarioRepository.save(scenario);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/application-scenarios/{id}")
    public ApiResponse<ApplicationScenario> updateScenario(@PathVariable Long id, @RequestBody ApplicationScenario scenario) {
        return applicationScenarioRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(scenario.getTitle());
                    existing.setDescription(scenario.getDescription());
                    existing.setImageUrl(scenario.getImageUrl());
                    existing.setSortOrder(scenario.getSortOrder());
                    ApplicationScenario saved = applicationScenarioRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("记录不存在"));
    }

    @DeleteMapping("/application-scenarios/{id}")
    public ApiResponse<Void> deleteScenario(@PathVariable Long id) {
        try {
            applicationScenarioRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    @GetMapping("/news")
    public ApiResponse<List<News>> getNews() {
        return ApiResponse.success(newsRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/news/{id}")
    public ApiResponse<News> getNewsDetail(@PathVariable Long id) {
        return newsRepository.findById(id)
                .map(news -> ApiResponse.success(news))
                .orElse(ApiResponse.error("新闻不存在"));
    }

    @PostMapping("/news")
    public ApiResponse<News> createNews(@RequestBody News news) {
        try {
            News saved = newsRepository.save(news);
            return ApiResponse.success("创建成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/news/{id}")
    public ApiResponse<News> updateNews(@PathVariable Long id, @RequestBody News news) {
        return newsRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(news.getTitle());
                    existing.setSummary(news.getSummary());
                    existing.setContent(news.getContent());
                    existing.setImageUrl(news.getImageUrl());
                    existing.setPublishDate(news.getPublishDate());
                    existing.setStatus(news.getStatus());
                    News saved = newsRepository.save(existing);
                    return ApiResponse.success("更新成功", saved);
                })
                .orElse(ApiResponse.error("新闻不存在"));
    }

    @DeleteMapping("/news/{id}")
    public ApiResponse<Void> deleteNews(@PathVariable Long id) {
        try {
            newsRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    @GetMapping("/contact-info")
    public ApiResponse<ContactInfo> getContactInfo() {
        List<ContactInfo> list = contactInfoRepository.findAll();
        if (!list.isEmpty()) {
            return ApiResponse.success(list.get(0));
        }
        return ApiResponse.success(null);
    }

    @PostMapping("/contact-info")
    public ApiResponse<ContactInfo> saveContactInfo(@RequestBody ContactInfo info) {
        try {
            ContactInfo saved = contactInfoRepository.save(info);
            return ApiResponse.success("保存成功", saved);
        } catch (Exception e) {
            return ApiResponse.error("保存失败: " + e.getMessage());
        }
    }

    @GetMapping("/contact-messages")
    public ApiResponse<List<ContactMessage>> getContactMessages() {
        return ApiResponse.success(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/contact-messages/unread-count")
    public ApiResponse<Long> getUnreadCount() {
        return ApiResponse.success(contactMessageRepository.countByIsReadFalse());
    }

    @GetMapping("/contact-messages/{id}")
    public ApiResponse<ContactMessage> getMessageDetail(@PathVariable Long id) {
        return contactMessageRepository.findById(id)
                .map(message -> {
                    message.setIsRead(true);
                    contactMessageRepository.save(message);
                    return ApiResponse.success(message);
                })
                .orElse(ApiResponse.error("消息不存在"));
    }

    @DeleteMapping("/contact-messages/{id}")
    public ApiResponse<Void> deleteMessage(@PathVariable Long id) {
        try {
            contactMessageRepository.deleteById(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }
}
