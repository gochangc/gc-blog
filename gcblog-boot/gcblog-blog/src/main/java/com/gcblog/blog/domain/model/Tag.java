package com.gcblog.blog.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;

@Data
@Table("tb_tag")
public class Tag {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private String name;
}
