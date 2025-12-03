package com.user.service.impl;

import com.user.dto.GroupRepresentationDTO;
import com.user.dto.ProfileDTO;
import com.user.dto.RegisterDTO;
import com.user.dto.UserDTO;
import com.user.exception.BadRequestException;
import com.user.exception.ErrorResponse;
import com.user.mapper.GroupRepresentationMapper;
import com.user.mapper.UserMapper;
import com.user.service.UserService;
import jakarta.ws.rs.core.Response;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Value("${custom-keycloak-owner-realm}")
    private String realmName;

    private final Keycloak keycloak;

    private final UserMapper userMapper;

    private final GroupRepresentationMapper groupRepresentationMapper;

    public UserServiceImpl(Keycloak keycloak, UserMapper userMapper, GroupRepresentationMapper groupRepresentationMapper) {
        this.keycloak = keycloak;
        this.userMapper = userMapper;
        this.groupRepresentationMapper = groupRepresentationMapper;
    }

    @Override
    public void registerUser(RegisterDTO registerDTO) {
        log.debug("Registering user {}", registerDTO.getUsername());
        // Define user
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(registerDTO.getUsername());
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setEmail(registerDTO.getEmail());
        user.setAttributes(Collections.singletonMap("origin", Arrays.asList("demo")));

        // Get realm
        RealmResource realmResource = keycloak.realm(realmName);
        UsersResource usersRessource = realmResource.users();

        // Create user (requires manage-users role)
        Response response = usersRessource.create(user);
        System.out.printf("Repsonse: %s %s%n", response.getStatus(), response.getStatusInfo());
        if( response.getStatus() != 201 ){
            ErrorResponse error = response.readEntity(ErrorResponse.class);
            throw new BadRequestException(error.getErrorMessage());
        }
        String userId = CreatedResponseUtil.getCreatedId(response);

        System.out.printf("User created with userId: %s%n", userId);

        // Define password credential
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(registerDTO.getPassword());

        UserResource userResource = usersRessource.get(userId);

        // Set password credential
        userResource.resetPassword(passwordCred);

//        // Get realm role "tester" (requires view-realm role)
//        RoleRepresentation testerRealmRole = realmResource.roles()//
//                .get("tester").toRepresentation();
//
//        // Assign realm role tester to user
//        userResource.roles().realmLevel() //
//                .add(Arrays.asList(testerRealmRole));
//
//        // Get client
//        ClientRepresentation app1Client = realmResource.clients() //
//                .findByClientId(clientId).get(0);
//
//        // Get client level role (requires view-clients role)
//        RoleRepresentation userClientRole = realmResource.clients().get(app1Client.getId()) //
//                .roles().get("user").toRepresentation();
//
//        // Assign client level role to user
//        userResource.roles() //
//                .clientLevel(app1Client.getId()).add(Arrays.asList(userClientRole));

        // Send password reset E-Mail
        // VERIFY_EMAIL, UPDATE_PROFILE, CONFIGURE_TOTP, UPDATE_PASSWORD, TERMS_AND_CONDITIONS
        // usersRessource.get(userId).executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));

    }

    public List<UserDTO> listUsers() {
        log.debug("Listing users");
        RealmResource realmResource = keycloak.realm(realmName);
        return realmResource.users().list().stream().map(userMapper::toDto).toList();
    }

    @Override
    public ProfileDTO getCurrentUser(Jwt jwt) {
        return getUserById(jwt.getClaim("sub"));
    }

    @Cacheable(value = "userCache", key = "#id")
    @Override
    public ProfileDTO getUserById(String id) {
        log.debug("get current user by id: {}", id);
        RealmResource realmResource = keycloak.realm(realmName);
        UserResource userResource = realmResource.users().get(id);
        List<GroupRepresentationDTO> groups = userResource.groups().stream().map(groupRepresentationMapper::groupRepresentationToGroupRepresentationDTO).toList();
        return ProfileDTO.builder()
                .id(userResource.toRepresentation().getId())
                .username(userResource.toRepresentation().getUsername())
                .firstName(userResource.toRepresentation().getFirstName())
                .lastName(userResource.toRepresentation().getLastName())
                .email(userResource.toRepresentation().getEmail())
                .groups(groups)
                .build();
    }

    @Cacheable(value = "groupsCache")
    @Override
    public List<GroupRepresentationDTO> listGroups() {
        log.debug("Listing groups");
        RealmResource realmResource = keycloak.realm(realmName);
        return realmResource.groups().groups().stream().map(groupRepresentationMapper::groupRepresentationToGroupRepresentationDTO).toList();
    }
}
