package com.offer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOfferDTO extends AddOfferDTO{
    @NotBlank(message = "Id is required")
    private String id;
    @NotBlank(message = "User Id is required")
    private String userId;
}
