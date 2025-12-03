package com.offer.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OfferDTO {
    private String id;
    private String title;
    private String description;
    private BigDecimal price;
    private String userId;
}
