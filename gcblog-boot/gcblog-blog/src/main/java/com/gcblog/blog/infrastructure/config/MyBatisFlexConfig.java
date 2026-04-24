package com.gcblog.blog.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.mybatis.spring.annotation.MapperScan;

@Configuration
@MapperScan("com.gcblog.blog.adapter.out")
public class MyBatisFlexConfig {
}
