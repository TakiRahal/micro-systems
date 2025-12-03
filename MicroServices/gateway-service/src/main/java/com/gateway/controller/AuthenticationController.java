package com.gateway.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;

@RestController
@RequestMapping({ "/authorization" })
public class AuthenticationController {

    Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @Value("${url-login-page}")
    private String urlLoginPage;

    @Value("${provider-login-page}")

    @GetMapping({ "/keycloak" })
    public Mono<HashMap<String, String>> getAuth(){
        log.info("start processing keycloak and return url redirect : {}", urlLoginPage);
        final HashMap<String, String> response = new HashMap<>();
        response.put("url", urlLoginPage);
        return Mono.just(response);
    }
}
