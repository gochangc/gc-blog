package com.gcblog.navigation.domain.service;

import com.gcblog.navigation.domain.model.NavLink;
import org.springframework.stereotype.Service;

@Service
public class NavLinkDomainService {
    // URL格式校验
    public void validateUrl(NavLink navLink) {}
    // 删除前校验
    public void validateDelete(NavLink navLink) {}
}
