package com.gcblog.framework.auth.annotation;

import java.lang.annotation.*;

// 角色校验注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequireRole {
    String value();
}
