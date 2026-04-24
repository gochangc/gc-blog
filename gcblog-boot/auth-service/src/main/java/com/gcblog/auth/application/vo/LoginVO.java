package com.gcblog.auth.application.vo;

import lombok.Data;

@Data
public class LoginVO {
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
    private String nickname;
    private String avatar;
}
