package com.gcblog.blog.application.service;

import com.gcblog.blog.application.dto.ArticleDTO;
import com.gcblog.blog.application.vo.ArticleDetailVO;
import com.gcblog.blog.application.vo.ArticleVO;
import com.gcblog.blog.domain.repository.ArticleRepository;
import com.gcblog.blog.domain.service.ArticleDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleApplicationService {

    private final ArticleRepository articleRepository;
    private final ArticleDomainService articleDomainService;

    public void create(ArticleDTO dto) {}
    public void update(Long id, ArticleDTO dto) {}
    public void publish(Long id) {}
    public void delete(Long id) {}
    public ArticleDetailVO getById(Long id) { return null; }
    public List<ArticleVO> page(Integer current, Integer size) { return null; }
}
