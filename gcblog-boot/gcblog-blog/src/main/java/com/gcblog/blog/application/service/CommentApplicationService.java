package com.gcblog.blog.application.service;

import com.gcblog.blog.application.dto.CommentDTO;
import com.gcblog.blog.domain.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentApplicationService {

    private final ArticleRepository articleRepository;

    public void create(CommentDTO dto) {}
    public void delete(Long id) {}
}
