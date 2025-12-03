package com.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferEventDTO{
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
