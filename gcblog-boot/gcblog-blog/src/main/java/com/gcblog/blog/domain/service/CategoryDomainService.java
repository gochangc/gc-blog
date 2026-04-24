package com.gcblog.blog.domain.service;

import com.gcblog.blog.domain.model.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryDomainService {
    // 分类删除校验（是否有文章关联）
    public void validateDelete(Category category) {}
}
