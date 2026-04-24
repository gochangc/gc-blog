package com.gcblog.blog.adapter.in;

import com.gcblog.blog.application.dto.ArticleDTO;
import com.gcblog.blog.application.service.ArticleApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    private final ArticleApplicationService articleApplicationService;

    @PostMapping
    public void create(@RequestBody ArticleDTO dto) {
        articleApplicationService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody ArticleDTO dto) {
        articleApplicationService.update(id, dto);
    }

    @PutMapping("/{id}/publish")
    public void publish(@PathVariable Long id) {
        articleApplicationService.publish(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        articleApplicationService.delete(id);
    }
}
