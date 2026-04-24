package com.gcblog.navigation.adapter.in;

import com.gcblog.navigation.application.dto.NavLinkDTO;
import com.gcblog.navigation.application.service.NavLinkApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/nav-links")
@RequiredArgsConstructor
public class AdminNavLinkController {

    private final NavLinkApplicationService navLinkApplicationService;

    @PostMapping
    public void create(@RequestBody NavLinkDTO dto) {
        navLinkApplicationService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody NavLinkDTO dto) {
        navLinkApplicationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        navLinkApplicationService.delete(id);
    }
}
