package com.gcblog.blog.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Table("tb_comment")
public class Comment {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private Long articleId;
    private Long userId;
    private String content;
    private Long parentId;
    private LocalDateTime createTime;
}
