package com.gcblog.auth.adapter.out;

import com.gcblog.auth.domain.model.Token;
import com.gcblog.auth.domain.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TokenRepositoryImpl implements TokenRepository {

    private final TokenMapper tokenMapper;

    @Override
    public Token save(Token token) {
        tokenMapper.insertOrUpdate(token);
        return token;
    }

    @Override
    public Optional<Token> findByAccessToken(String accessToken) {
        return Optional.empty();
    }

    @Override
    public Optional<Token> findByRefreshToken(String refreshToken) {
        return Optional.empty();
    }

    @Override
    public void deleteByUserId(Long userId) {}
}
