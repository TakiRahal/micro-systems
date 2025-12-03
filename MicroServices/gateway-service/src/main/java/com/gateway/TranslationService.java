package com.gateway;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class TranslationService {

    public Map<String, String> loadTranslations(String lang) {
        String fileName = "messages_" + lang + ".yml";
        Properties props = new Properties();

        try (InputStreamReader reader = new InputStreamReader(
                new ClassPathResource(fileName).getInputStream(),
                StandardCharsets.UTF_8)) {
            props.load(reader);
        } catch (IOException e) {
            throw new RuntimeException("Could not load translations for lang: " + lang, e);
        }

        // Convert Properties to Map<String, String>
        Map<String, String> map = new HashMap<>();
        for (String key : props.stringPropertyNames()) {
            map.put(key, props.getProperty(key));
        }
        return map;
    }
}
