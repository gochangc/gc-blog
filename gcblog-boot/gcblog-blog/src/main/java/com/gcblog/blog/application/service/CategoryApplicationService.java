package com.gcblog.blog.application.service;

import com.gcblog.blog.application.dto.CategoryDTO;
import com.gcblog.blog.application.vo.CategoryVO;
import com.gcblog.blog.domain.repository.CategoryRepository;
import com.gcblog.blog.domain.service.CategoryDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryApplicationService {

    private final CategoryRepository categoryRepository;
    private final CategoryDomainService categoryDomainService;

    public void create(CategoryDTO dto) {}
    public void update(Long id, CategoryDTO dto) {}
    public void delete(Long id) {}
    public List<CategoryVO> listAll() { return null; }
}
