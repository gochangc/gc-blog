package com.gcblog.navigation.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;

@Data
@Table("tb_nav_link")
public class NavLink {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private Long categoryId;
    private String title;
    private String url;
    private String description;
    private String icon;
    private Integer sort;
    private Integer visitCount;
}
