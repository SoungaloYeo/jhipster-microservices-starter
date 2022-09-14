package com.demo.author.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;

class TagMapperTest {

    private TagMapper tagMapper;

    @BeforeEach
    public void setUp() {
        tagMapper = new TagMapperImpl();
    }
}
