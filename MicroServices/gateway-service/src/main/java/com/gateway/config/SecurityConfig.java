package com.gateway.config;

import com.gateway.components.KcAuthenticationEntryPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.oidc.web.server.logout.OidcClientInitiatedServerLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    @Value("${url-login-page}")
    private String urlLoginPage;

    @Value("${redirect-success-login}")
    private String redirectSuccessLogin;

    @Value("${redirect-success-logout}")
    private String redirectSuccessLogout;

    private final ReactiveClientRegistrationRepository clientRegistrationRepository;

    public SecurityConfig(ReactiveClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity serverHttpSecurity){
        serverHttpSecurity
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange-> exchange
                        .pathMatchers("/api/gateway/public/**").permitAll() // Allows public access to the root URL
                        .pathMatchers("/api/user/public/**").permitAll() // Allows public access to the root URL
                        .pathMatchers("/api/offer/public/**").permitAll() // Allows public access to the root URL
                        .pathMatchers("/authorization/**").permitAll() // authorization endpoint
                        .pathMatchers("/actuator/**").permitAll()
                        .pathMatchers("/eureka/**").permitAll() // authorization endpoint
                        .anyExchange()
                        .authenticated())
                .oauth2Login(oauth2 -> {
                    oauth2.loginPage(urlLoginPage)
                            .authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler(redirectSuccessLogin));
                })
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults())
                )
                .exceptionHandling(exception -> {
                    exception.authenticationEntryPoint(new KcAuthenticationEntryPoint());
                })
                .logout(logout -> logout
                        .logoutUrl("/path-user-logout")
                        .logoutSuccessHandler(oidcLogoutSuccessHandler())
                );
        return serverHttpSecurity.build();

    }

    private ServerLogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedServerLogoutSuccessHandler oidcLogoutSuccessHandler =
                new OidcClientInitiatedServerLogoutSuccessHandler(this.clientRegistrationRepository);

        // Sets the location that the End-User's User Agent will be redirected to
        // after the logout has been performed at the Provider

        log.debug("ServerLogoutSuccessHandler redirectSuccessLogout : {}", redirectSuccessLogout);
        oidcLogoutSuccessHandler.setPostLogoutRedirectUri(redirectSuccessLogout);
        return oidcLogoutSuccessHandler;
    }
}
