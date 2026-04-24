package com.gcblog.user.application.service;

import com.gcblog.user.application.dto.UserDTO;
import com.gcblog.user.application.vo.UserVO;
import com.gcblog.user.domain.repository.UserRepository;
import com.gcblog.user.domain.service.UserDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserApplicationService {

    private final UserRepository userRepository;
    private final UserDomainService userDomainService;

    public void create(UserDTO dto) {}
    public void update(Long id, UserDTO dto) {}
    public void delete(Long id) {}
    public UserVO getById(Long id) { return null; }
    public UserVO getByUsername(String username) { return null; }
}
