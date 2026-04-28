package com.dayin.repository;

import com.dayin.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByStatusOrderByPublishDateDesc(News.NewsStatus status);
    List<News> findAllByOrderByCreatedAtDesc();
}
