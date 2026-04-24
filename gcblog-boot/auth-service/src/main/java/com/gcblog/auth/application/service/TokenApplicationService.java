package com.gcblog.auth.application.service;

import com.gcblog.auth.application.dto.TokenDTO;
import com.gcblog.auth.application.vo.LoginVO;
import com.gcblog.auth.domain.repository.TokenRepository;
import com.gcblog.auth.domain.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenApplicationService {

    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    public LoginVO refresh(TokenDTO dto) { return null; }
    public boolean validate(String accessToken) { return false; }
}
