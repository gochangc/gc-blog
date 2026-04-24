package com.gcblog.blog.application.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private String name;
    private String description;
    private Integer sort;
}
