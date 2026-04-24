package com.gcblog.user.adapter.out;

import com.gcblog.user.domain.model.Role;
import com.gcblog.user.domain.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

    private final RoleMapper roleMapper;

    @Override
    public Role save(Role role) {
        roleMapper.insertOrUpdate(role);
        return role;
    }

    @Override
    public Optional<Role> findById(Long id) {
        return Optional.ofNullable(roleMapper.selectOneById(id));
    }

    @Override
    public List<Role> findByUserId(Long userId) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        roleMapper.deleteById(id);
    }
}
