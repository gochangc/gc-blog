package com.gcblog.blog.adapter.in;

import com.gcblog.blog.application.dto.CategoryDTO;
import com.gcblog.blog.application.service.CategoryApplicationService;
import com.gcblog.blog.application.vo.CategoryVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryApplicationService categoryApplicationService;

    @GetMapping
    public List<CategoryVO> listAll() {
        return categoryApplicationService.listAll();
    }

    @PostMapping
    public void create(@RequestBody CategoryDTO dto) {
        categoryApplicationService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody CategoryDTO dto) {
        categoryApplicationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryApplicationService.delete(id);
    }
}
