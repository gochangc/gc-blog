package com.gcblog.blog.domain.model;

import com.mybatisflex.annotation.Table;
import lombok.Data;

@Data
@Table("tb_article_tag")
public class ArticleTag {
    private Long articleId;
    private Long tagId;
}
