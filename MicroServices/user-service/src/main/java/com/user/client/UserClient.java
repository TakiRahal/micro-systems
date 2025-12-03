package com.user.client;

import com.user.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserClient {

    @GetMapping("/api/gateway/user")
    UserDTO getCurrentUser();

    @GetMapping("/api/offer/public")
    String getOfferId();
}
