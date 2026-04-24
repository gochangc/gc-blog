package com.gcblog.navigation.adapter.in;

import com.gcblog.navigation.application.dto.NavCategoryDTO;
import com.gcblog.navigation.application.service.NavCategoryApplicationService;
import com.gcblog.navigation.application.vo.NavCategoryVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/nav-categories")
@RequiredArgsConstructor
public class NavCategoryController {

    private final NavCategoryApplicationService navCategoryApplicationService;

    @GetMapping
    public List<NavCategoryVO> listAllWithLinks() {
        return navCategoryApplicationService.listAllWithLinks();
    }

    @PostMapping
    public void create(@RequestBody NavCategoryDTO dto) {
        navCategoryApplicationService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody NavCategoryDTO dto) {
        navCategoryApplicationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        navCategoryApplicationService.delete(id);
    }
}
