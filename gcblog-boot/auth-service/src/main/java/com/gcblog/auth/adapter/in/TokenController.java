package com.gcblog.auth.adapter.in;

import com.gcblog.auth.application.dto.TokenDTO;
import com.gcblog.auth.application.service.TokenApplicationService;
import com.gcblog.auth.application.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/token")
@RequiredArgsConstructor
public class TokenController {

    private final TokenApplicationService tokenApplicationService;

    @PostMapping("/refresh")
    public LoginVO refresh(@RequestBody TokenDTO dto) {
        return tokenApplicationService.refresh(dto);
    }

    @GetMapping("/validate")
    public boolean validate(@RequestParam String token) {
        return tokenApplicationService.validate(token);
    }
}
