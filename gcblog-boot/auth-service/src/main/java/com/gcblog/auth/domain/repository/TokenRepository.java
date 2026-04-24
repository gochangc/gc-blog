package com.gcblog.auth.domain.repository;

import com.gcblog.auth.domain.model.Token;
import java.util.Optional;

public interface TokenRepository {
    Token save(Token token);
    Optional<Token> findByAccessToken(String accessToken);
    Optional<Token> findByRefreshToken(String refreshToken);
    void deleteByUserId(Long userId);
}
