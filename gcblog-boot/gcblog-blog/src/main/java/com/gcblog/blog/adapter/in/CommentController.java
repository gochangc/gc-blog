package com.gcblog.blog.adapter.in;

import com.gcblog.blog.application.dto.CommentDTO;
import com.gcblog.blog.application.service.CommentApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentApplicationService commentApplicationService;

    @PostMapping
    public void create(@RequestBody CommentDTO dto) {
        commentApplicationService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        commentApplicationService.delete(id);
    }
}
