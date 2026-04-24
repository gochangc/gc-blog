package com.gcblog.blog.adapter.out;

import com.gcblog.blog.domain.model.Article;
import com.gcblog.framework.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ArticleCacheAdapter {

    private final RedisService redisService;
    private static final String CACHE_KEY = "article:";

    public Optional<Article> getFromCache(Long id) {
        return Optional.empty();
    }

    public void putToCache(Article article) {}

    public void evict(Long id) {}
}
