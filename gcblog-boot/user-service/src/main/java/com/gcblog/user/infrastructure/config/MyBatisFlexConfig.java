package com.gcblog.user.infrastructure.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.gcblog.user.adapter.out")
public class MyBatisFlexConfig {
}
