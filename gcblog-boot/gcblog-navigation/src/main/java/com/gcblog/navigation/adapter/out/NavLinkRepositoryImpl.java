package com.gcblog.navigation.adapter.out;

import com.gcblog.navigation.domain.model.NavLink;
import com.gcblog.navigation.domain.repository.NavLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NavLinkRepositoryImpl implements NavLinkRepository {

    private final NavLinkMapper navLinkMapper;

    @Override
    public NavLink save(NavLink navLink) {
        navLinkMapper.insertOrUpdate(navLink);
        return navLink;
    }

    @Override
    public Optional<NavLink> findById(Long id) {
        return Optional.ofNullable(navLinkMapper.selectOneById(id));
    }

    @Override
    public List<NavLink> findByCategoryId(Long categoryId) {
        return null;
    }

    @Override
    public List<NavLink> findAll() {
        return navLinkMapper.selectAll();
    }

    @Override
    public void deleteById(Long id) {
        navLinkMapper.deleteById(id);
    }
}
