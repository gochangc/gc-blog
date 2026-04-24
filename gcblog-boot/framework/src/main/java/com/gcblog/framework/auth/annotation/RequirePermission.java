package com.gcblog.framework.auth.annotation;

import java.lang.annotation.*;

// 权限校验注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequirePermission {
    String value();
}
