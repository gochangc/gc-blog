package com.gcblog.navigation.adapter.out;

import com.gcblog.framework.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NavLinkCacheAdapter {

    private final RedisService redisService;
    private static final String CACHE_KEY = "nav:links";

    public void evictAll() {}
}
