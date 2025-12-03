package com.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterDTO {
    @NotBlank
    private String username;
    private String firstName;
    private String lastName;
    @NotBlank
    private String password;
    @NotBlank
    @Email
    private String email;
}
