package com.gcblog.navigation.application.service;

import com.gcblog.navigation.application.dto.NavLinkDTO;
import com.gcblog.navigation.application.vo.NavLinkVO;
import com.gcblog.navigation.domain.repository.NavLinkRepository;
import com.gcblog.navigation.domain.service.NavLinkDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NavLinkApplicationService {

    private final NavLinkRepository navLinkRepository;
    private final NavLinkDomainService navLinkDomainService;

    public void create(NavLinkDTO dto) {}
    public void update(Long id, NavLinkDTO dto) {}
    public void delete(Long id) {}
    public List<NavLinkVO> listAll() { return null; }
    public void recordVisit(Long id) {}
}
