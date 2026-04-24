package com.gcblog.blog.domain.repository;

import com.gcblog.blog.domain.model.Article;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository {
    Article save(Article article);
    Optional<Article> findById(Long id);
    List<Article> findByStatus(Integer status, Integer current, Integer size);
    Long countByStatus(Integer status);
    void deleteById(Long id);
}
