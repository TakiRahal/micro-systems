package com.user.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.oauth2.server.resource.web.reactive.function.client.ServletBearerExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class UserConfig {

    @Value("${custom-keycloak-server-url}")
    private String keycloakServerUrl;

    @Value("${custom-keycloak-master-realm}")
    private String keycloakMasterRealm;

    @Value("${custom-keycloak-owner-realm}")
    private String keycloakOwnerRealm;

    @Value("${custom-keycloak-username}")
    private String keycloakUsername;

    @Value("${custom-keycloak-password}")
    private String keycloakPassword;

    @Value("${custom-keycloak-client-id}")
    private String keycloakClientId;

    @Value("${custom-keycloak-client-secret}")
    private String keycloakClientSecret;

    @EventListener
    void displayListUsers(ContextRefreshedEvent event) {
        System.out.print("Get User List ");
    }

    @Bean
    Keycloak keycloakAdminClient(){
        return KeycloakBuilder.builder() //
                .serverUrl(keycloakServerUrl) //
                .realm(keycloakMasterRealm) //
                .grantType(OAuth2Constants.PASSWORD) //
                .clientId(keycloakClientId) //
                // .clientSecret(keycloakClientSecret) //
                .username(keycloakUsername) //
                .password(keycloakPassword) //
                .build();
    }

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .filter(new ServletBearerExchangeFilterFunction())
                .build();
    }
}
