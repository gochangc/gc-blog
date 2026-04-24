package com.gcblog.auth.application.service;

import com.gcblog.auth.application.dto.LoginDTO;
import com.gcblog.auth.application.dto.RegisterDTO;
import com.gcblog.auth.application.vo.LoginVO;
import com.gcblog.auth.domain.repository.TokenRepository;
import com.gcblog.auth.domain.service.AuthDomainService;
import com.gcblog.auth.domain.service.JwtService;
import com.gcblog.auth.domain.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthApplicationService {

    private final TokenRepository tokenRepository;
    private final AuthDomainService authDomainService;
    private final JwtService jwtService;
    private final PasswordService passwordService;

    public LoginVO login(LoginDTO dto) { return null; }
    public void register(RegisterDTO dto) {}
    public void logout(String accessToken) {}
}
