package com.gcblog.user.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;

@Data
@Table("tb_permission")
public class Permission {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private String name;
    private String code;
    private String description;
}
