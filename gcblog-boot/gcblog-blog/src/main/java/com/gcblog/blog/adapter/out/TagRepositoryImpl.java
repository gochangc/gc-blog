package com.gcblog.blog.adapter.out;

import com.gcblog.blog.domain.model.Tag;
import com.gcblog.blog.domain.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepository {

    private final TagMapper tagMapper;

    @Override
    public Tag save(Tag tag) {
        tagMapper.insertOrUpdate(tag);
        return tag;
    }

    @Override
    public List<Tag> findAll() {
        return tagMapper.selectAll();
    }

    @Override
    public List<Tag> findByArticleId(Long articleId) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        tagMapper.deleteById(id);
    }
}
