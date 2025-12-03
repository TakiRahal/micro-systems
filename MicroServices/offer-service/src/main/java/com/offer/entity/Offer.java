package com.offer.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Data
@Document(collection = "offer")
public class Offer {
    @Id
    private String id;
    private String title;
    private String description;
    private BigDecimal price;
    private String userId;
}
