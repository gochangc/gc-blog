package com.gcblog.navigation.infrastructure.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.gcblog.navigation.adapter.out")
public class MyBatisFlexConfig {
}
