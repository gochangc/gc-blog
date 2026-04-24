package com.gcblog.auth.adapter.in;

import com.gcblog.auth.application.dto.LoginDTO;
import com.gcblog.auth.application.dto.RegisterDTO;
import com.gcblog.auth.application.service.AuthApplicationService;
import com.gcblog.auth.application.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthApplicationService authApplicationService;

    @PostMapping("/login")
    public LoginVO login(@RequestBody LoginDTO dto) {
        return authApplicationService.login(dto);
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDTO dto) {
        authApplicationService.register(dto);
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String token) {
        authApplicationService.logout(token.replace("Bearer ", ""));
    }
}
