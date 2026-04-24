package com.gcblog.auth.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PermissionApplicationService {
    public boolean hasPermission(Long userId, String permission) { return false; }
    public boolean hasRole(Long userId, String role) { return false; }
}
