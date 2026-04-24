package com.gcblog.navigation.application.service;

import com.gcblog.navigation.application.dto.NavCategoryDTO;
import com.gcblog.navigation.application.vo.NavCategoryVO;
import com.gcblog.navigation.domain.repository.NavCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NavCategoryApplicationService {

    private final NavCategoryRepository navCategoryRepository;

    public void create(NavCategoryDTO dto) {}
    public void update(Long id, NavCategoryDTO dto) {}
    public void delete(Long id) {}
    public List<NavCategoryVO> listAllWithLinks() { return null; }
}
