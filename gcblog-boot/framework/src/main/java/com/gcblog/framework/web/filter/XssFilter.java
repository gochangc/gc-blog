package com.gcblog.framework.web.filter;

import jakarta.servlet.*;
import java.io.IOException;

// XSS 过滤器
public class XssFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(request, response);
    }
}
