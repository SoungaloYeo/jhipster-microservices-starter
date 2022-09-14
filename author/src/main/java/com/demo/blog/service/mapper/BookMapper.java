package com.demo.blog.service.mapper;

import com.demo.blog.domain.Author;
import com.demo.blog.domain.Book;
import com.demo.blog.domain.Tag;
import com.demo.blog.service.dto.AuthorDTO;
import com.demo.blog.service.dto.BookDTO;
import com.demo.blog.service.dto.TagDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Book} and its DTO {@link BookDTO}.
 */
@Mapper(componentModel = "spring")
public interface BookMapper extends EntityMapper<BookDTO, Book> {
    @Mapping(target = "author", source = "author", qualifiedByName = "authorName")
    @Mapping(target = "tags", source = "tags", qualifiedByName = "tagNameSet")
    BookDTO toDto(Book s);

    @Mapping(target = "removeTag", ignore = true)
    Book toEntity(BookDTO bookDTO);

    @Named("authorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    AuthorDTO toDtoAuthorName(Author author);

    @Named("tagName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    TagDTO toDtoTagName(Tag tag);

    @Named("tagNameSet")
    default Set<TagDTO> toDtoTagNameSet(Set<Tag> tag) {
        return tag.stream().map(this::toDtoTagName).collect(Collectors.toSet());
    }
}
