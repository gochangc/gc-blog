package com.gcblog.blog.adapter.in;

import com.gcblog.blog.application.dto.TagDTO;
import com.gcblog.blog.application.service.TagApplicationService;
import com.gcblog.blog.domain.model.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagApplicationService tagApplicationService;

    @GetMapping
    public List<Tag> listAll() {
        return tagApplicationService.listAll();
    }

    @PostMapping
    public void create(@RequestBody TagDTO dto) {
        tagApplicationService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tagApplicationService.delete(id);
    }
}
