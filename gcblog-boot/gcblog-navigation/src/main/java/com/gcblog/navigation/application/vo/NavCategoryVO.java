package com.gcblog.navigation.application.vo;

import lombok.Data;
import java.util.List;

@Data
public class NavCategoryVO {
    private Long id;
    private String name;
    private String icon;
    private Integer sort;
    private List<NavLinkVO> links;
}
