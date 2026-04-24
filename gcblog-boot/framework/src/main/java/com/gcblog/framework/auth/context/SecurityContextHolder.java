package com.gcblog.framework.auth.context;

// 安全上下文持有者
public class SecurityContextHolder {
    private static final ThreadLocal<UserContext> CONTEXT = new ThreadLocal<>();

    public static void set(UserContext context) { CONTEXT.set(context); }
    public static UserContext get() { return CONTEXT.get(); }
    public static void clear() { CONTEXT.remove(); }
}
