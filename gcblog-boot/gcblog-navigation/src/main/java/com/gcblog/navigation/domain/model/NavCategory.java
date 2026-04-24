package com.gcblog.navigation.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;

@Data
@Table("tb_nav_category")
public class NavCategory {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private String name;
    private String icon;
    private Integer sort;
}
