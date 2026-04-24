package com.gcblog.user.adapter.out;

import com.gcblog.framework.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserCacheAdapter {

    private final RedisService redisService;
    private static final String CACHE_KEY = "user:";

    public void evict(Long id) {}
}
