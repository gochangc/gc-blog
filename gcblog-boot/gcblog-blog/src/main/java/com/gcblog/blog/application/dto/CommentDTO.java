package com.gcblog.blog.application.dto;

import lombok.Data;

@Data
public class CommentDTO {
    private Long articleId;
    private String content;
    private Long parentId;
}
