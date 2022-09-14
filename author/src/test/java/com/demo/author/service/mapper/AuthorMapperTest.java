package com.demo.author.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;

class AuthorMapperTest {

    private AuthorMapper authorMapper;

    @BeforeEach
    public void setUp() {
        authorMapper = new AuthorMapperImpl();
    }
}
