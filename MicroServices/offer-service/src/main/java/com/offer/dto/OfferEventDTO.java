package com.offer.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferEventDTO implements Serializable {
    private String userId;
    private String productId;
    private String status;

    @Override
    public String toString() {
        return "OfferEven{" +
                ", userId='" + userId + '\'' +
                ", productId='" + productId + '\'' +
                ", status=" + status +
                '}';
    }
}
