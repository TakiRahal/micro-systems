package com.user.service;

import com.user.dto.GroupRepresentationDTO;
import com.user.dto.ProfileDTO;
import com.user.dto.RegisterDTO;
import com.user.dto.UserDTO;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

public interface UserService {

    void registerUser(RegisterDTO registerDTO);
    List<UserDTO> listUsers();
    ProfileDTO getUserById(String id);
    ProfileDTO getCurrentUser(Jwt jwt);
    List<GroupRepresentationDTO> listGroups();
}
