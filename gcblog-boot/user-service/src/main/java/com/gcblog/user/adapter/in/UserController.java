package com.gcblog.user.adapter.in;

import com.gcblog.user.application.dto.UserDTO;
import com.gcblog.user.application.service.UserApplicationService;
import com.gcblog.user.application.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserApplicationService userApplicationService;

    @GetMapping("/{id}")
    public UserVO getById(@PathVariable Long id) {
        return userApplicationService.getById(id);
    }

    @PostMapping
    public void create(@RequestBody UserDTO dto) {
        userApplicationService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody UserDTO dto) {
        userApplicationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userApplicationService.delete(id);
    }
}
