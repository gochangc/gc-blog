package com.gcblog.auth.infrastructure.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.gcblog.auth.adapter.out")
public class MyBatisFlexConfig {
}
