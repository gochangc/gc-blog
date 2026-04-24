package com.gcblog.blog.domain.service;

import com.gcblog.blog.domain.model.Article;
import org.springframework.stereotype.Service;

@Service
public class ArticleDomainService {
    // 文章发布校验
    public void validatePublish(Article article) {}
    // 文章删除校验
    public void validateDelete(Article article) {}
}
