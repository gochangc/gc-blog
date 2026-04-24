package com.gcblog.framework.user;

import lombok.Data;

// 当前登录用户信息
@Data
public class UserInfo {
    private Long id;
    private String username;
    private String nickname;
    private String avatar;
}
