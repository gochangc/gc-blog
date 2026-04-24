package com.gcblog.navigation.application.vo;

import lombok.Data;

@Data
public class NavLinkVO {
    private Long id;
    private Long categoryId;
    private String title;
    private String url;
    private String description;
    private String icon;
    private Integer sort;
    private Integer visitCount;
}
