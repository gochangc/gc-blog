package com.gcblog.blog.application.service;

import com.gcblog.blog.application.dto.TagDTO;
import com.gcblog.blog.domain.model.Tag;
import com.gcblog.blog.domain.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagApplicationService {

    private final TagRepository tagRepository;

    public void create(TagDTO dto) {}
    public void delete(Long id) {}
    public List<Tag> listAll() { return null; }
}
