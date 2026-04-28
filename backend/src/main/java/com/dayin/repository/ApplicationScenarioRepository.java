package com.dayin.repository;

import com.dayin.entity.ApplicationScenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationScenarioRepository extends JpaRepository<ApplicationScenario, Long> {
    List<ApplicationScenario> findAllByOrderBySortOrderAsc();
}
