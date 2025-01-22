package com.first.project.user_management_system.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserRequest userToUserDTO(User user);

    User userDTOToUser(UserRequest userRequest);

    @Mapping(target = "id", ignore = true)
    UserRequest createUserDTOWithoutId(User user);
}