package com.gcblog.blog.application.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ArticleDetailVO {
    private Long id;
    private String title;
    private String content;
    private String coverImage;
    private Long categoryId;
    private String categoryName;
    private List<String> tagNames;
    private Integer viewCount;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
