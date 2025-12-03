package com.gateway.controller;


import com.gateway.TranslationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("api/gateway")
public class GatewayController {

    Logger log = LoggerFactory.getLogger(GatewayController.class);
    private final TranslationService translationService;

    public GatewayController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @GetMapping("/public/translate")
    public Mono<Map<String, String>> loadTranslations(@RequestParam(defaultValue = "en") String lang){
        log.debug("Start translate here");
        return Mono.just(translationService.loadTranslations(lang));
    }
}
