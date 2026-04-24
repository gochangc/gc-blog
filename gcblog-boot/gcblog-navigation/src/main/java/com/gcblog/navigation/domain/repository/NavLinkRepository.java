package com.gcblog.navigation.domain.repository;

import com.gcblog.navigation.domain.model.NavLink;
import java.util.List;
import java.util.Optional;

public interface NavLinkRepository {
    NavLink save(NavLink navLink);
    Optional<NavLink> findById(Long id);
    List<NavLink> findByCategoryId(Long categoryId);
    List<NavLink> findAll();
    void deleteById(Long id);
}
