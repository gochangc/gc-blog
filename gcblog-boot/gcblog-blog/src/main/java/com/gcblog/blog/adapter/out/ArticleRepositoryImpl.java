package com.gcblog.blog.adapter.out;

import com.gcblog.blog.domain.model.Article;
import com.gcblog.blog.domain.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepository {

    private final ArticleMapper articleMapper;

    @Override
    public Article save(Article article) {
        articleMapper.insertOrUpdate(article);
        return article;
    }

    @Override
    public Optional<Article> findById(Long id) {
        return Optional.ofNullable(articleMapper.selectOneById(id));
    }

    @Override
    public List<Article> findByStatus(Integer status, Integer current, Integer size) {
        return null;
    }

    @Override
    public Long countByStatus(Integer status) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        articleMapper.deleteById(id);
    }
}
