package com.user.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

// @Configuration
public class FeignConfig {
//    @Bean
//    public RequestInterceptor requestInterceptor() {
//        return requestTemplate -> {
//            String token = SecurityContextHolder.getContext().getAuthentication()
//                    .getCredentials().toString();
//            requestTemplate.header("Authorization", "Bearer " + token);
//        };
//    }
}
