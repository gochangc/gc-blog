package com.gcblog.navigation.domain.repository;

import com.gcblog.navigation.domain.model.NavCategory;
import java.util.List;
import java.util.Optional;

public interface NavCategoryRepository {
    NavCategory save(NavCategory category);
    Optional<NavCategory> findById(Long id);
    List<NavCategory> findAll();
    void deleteById(Long id);
}
