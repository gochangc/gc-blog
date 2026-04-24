package com.gcblog.navigation.adapter.out;

import com.gcblog.navigation.domain.model.NavCategory;
import com.gcblog.navigation.domain.repository.NavCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NavCategoryRepositoryImpl implements NavCategoryRepository {

    private final NavCategoryMapper navCategoryMapper;

    @Override
    public NavCategory save(NavCategory category) {
        navCategoryMapper.insertOrUpdate(category);
        return category;
    }

    @Override
    public Optional<NavCategory> findById(Long id) {
        return Optional.ofNullable(navCategoryMapper.selectOneById(id));
    }

    @Override
    public List<NavCategory> findAll() {
        return navCategoryMapper.selectAll();
    }

    @Override
    public void deleteById(Long id) {
        navCategoryMapper.deleteById(id);
    }
}
