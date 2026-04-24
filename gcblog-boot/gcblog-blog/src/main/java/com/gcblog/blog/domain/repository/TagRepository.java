package com.gcblog.blog.domain.repository;

import com.gcblog.blog.domain.model.Tag;
import java.util.List;

public interface TagRepository {
    Tag save(Tag tag);
    List<Tag> findAll();
    List<Tag> findByArticleId(Long articleId);
    void deleteById(Long id);
}
