package com.gcblog.blog.adapter.in;

import com.gcblog.blog.application.service.ArticleApplicationService;
import com.gcblog.blog.application.vo.ArticleDetailVO;
import com.gcblog.blog.application.vo.ArticleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleApplicationService articleApplicationService;

    @GetMapping
    public List<ArticleVO> page(@RequestParam(defaultValue = "1") Integer current,
                                @RequestParam(defaultValue = "10") Integer size) {
        return articleApplicationService.page(current, size);
    }

    @GetMapping("/{id}")
    public ArticleDetailVO getById(@PathVariable Long id) {
        return articleApplicationService.getById(id);
    }
}
