package com.gcblog.navigation.application.dto;

import lombok.Data;

@Data
public class NavLinkDTO {
    private Long categoryId;
    private String title;
    private String url;
    private String description;
    private String icon;
    private Integer sort;
}
