package com.gcblog.auth.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Table("tb_token")
public class Token {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private Long userId;
    private String accessToken;
    private String refreshToken;
    private LocalDateTime expireTime;
    private LocalDateTime createTime;
}
