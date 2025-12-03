package com.user.mapper;

import com.user.dto.GroupRepresentationDTO;
import org.keycloak.representations.idm.GroupRepresentation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface GroupRepresentationMapper{
    GroupRepresentationDTO groupRepresentationToGroupRepresentationDTO(GroupRepresentation groupRepresentation);
}
