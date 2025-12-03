package com.user.dto;

import lombok.Builder;
import lombok.Data;
import org.keycloak.representations.idm.GroupRepresentation;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class ProfileDTO implements Serializable {
    protected String id;
    protected String username;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected List<GroupRepresentationDTO> groups;
}
