package com.gcblog.user.application.service;

import com.gcblog.user.application.dto.RoleDTO;
import com.gcblog.user.domain.model.Role;
import com.gcblog.user.domain.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleApplicationService {

    private final RoleRepository roleRepository;

    public void create(RoleDTO dto) {}
    public void delete(Long id) {}
    public List<Role> listByUserId(Long userId) { return null; }
}
