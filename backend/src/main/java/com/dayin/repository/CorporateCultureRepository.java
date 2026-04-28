package com.dayin.repository;

import com.dayin.entity.CorporateCulture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorporateCultureRepository extends JpaRepository<CorporateCulture, Long> {
    List<CorporateCulture> findAllByOrderBySortOrderAsc();
}
