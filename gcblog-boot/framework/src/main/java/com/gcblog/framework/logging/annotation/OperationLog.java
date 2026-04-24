package com.gcblog.framework.logging.annotation;

import java.lang.annotation.*;

// 操作日志注解
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface OperationLog {
    String value() default "";
}
