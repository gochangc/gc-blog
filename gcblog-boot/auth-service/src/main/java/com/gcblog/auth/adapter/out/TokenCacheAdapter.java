package com.gcblog.auth.adapter.out;

import com.gcblog.framework.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenCacheAdapter {

    private final RedisService redisService;
    private static final String TOKEN_KEY = "token:";

    public void store(String token, Long userId, long ttl) {}
    public Long getUserId(String token) { return null; }
    public void evict(String token) {}
}
