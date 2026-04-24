package com.gcblog.user.adapter.in;

import com.gcblog.user.application.dto.RoleDTO;
import com.gcblog.user.application.service.RoleApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleApplicationService roleApplicationService;

    @PostMapping
    public void create(@RequestBody RoleDTO dto) {
        roleApplicationService.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roleApplicationService.delete(id);
    }
}
