package com.user.mapper;

import com.user.dto.UserDTO;
import org.keycloak.representations.idm.UserRepresentation;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {})
public interface UserMapper extends EntityMapper<UserDTO, UserRepresentation> {

    @Named("userRepresentationToUserDTOById")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO userRepresentationToUserDTOById(UserRepresentation userRepresentation);
}
