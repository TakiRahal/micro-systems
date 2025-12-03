package com.gateway.route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

 @Configuration
public class AppRoutes {

    @Value("${uri-user-service}")
    private String uriUserService;

     @Value("${uri-offer-service}")
     private String uriOfferService;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user_service", r -> r.path("/api/user/**")
                        .filters(GatewayFilterSpec::tokenRelay)
                        .uri(uriUserService))
                .route("offer_service", r -> r.path("/api/offer/**")
                        .filters(GatewayFilterSpec::tokenRelay)
                        .uri(uriOfferService))
                .build();
    }
}
