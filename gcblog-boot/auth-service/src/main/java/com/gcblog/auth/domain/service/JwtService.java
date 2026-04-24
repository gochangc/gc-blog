package com.gcblog.auth.domain.service;

import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public String generateAccessToken(Long userId, String username) { return null; }
    public String generateRefreshToken(Long userId) { return null; }
    public boolean validateToken(String token) { return false; }
    public Long getUserIdFromToken(String token) { return null; }
}
