package com.gcblog.blog.application.dto;

import lombok.Data;
import java.util.List;

@Data
public class ArticleDTO {
    private String title;
    private String summary;
    private String content;
    private String coverImage;
    private Long categoryId;
    private List<Long> tagIds;
}
