package com.gcblog.navigation.adapter.in;

import com.gcblog.navigation.application.service.NavLinkApplicationService;
import com.gcblog.navigation.application.vo.NavLinkVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/nav-links")
@RequiredArgsConstructor
public class NavLinkController {

    private final NavLinkApplicationService navLinkApplicationService;

    @GetMapping
    public List<NavLinkVO> listAll() {
        return navLinkApplicationService.listAll();
    }

    @PostMapping("/{id}/visit")
    public void recordVisit(@PathVariable Long id) {
        navLinkApplicationService.recordVisit(id);
    }
}
