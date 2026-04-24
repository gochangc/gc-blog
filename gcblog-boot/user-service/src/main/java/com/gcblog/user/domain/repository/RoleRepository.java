package com.gcblog.user.domain.repository;

import com.gcblog.user.domain.model.Role;
import java.util.List;
import java.util.Optional;

public interface RoleRepository {
    Role save(Role role);
    Optional<Role> findById(Long id);
    List<Role> findByUserId(Long userId);
    void deleteById(Long id);
}
