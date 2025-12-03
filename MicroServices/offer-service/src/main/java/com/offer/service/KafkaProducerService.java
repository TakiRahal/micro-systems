package com.offer.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class KafkaProducerService <T>{
    private final KafkaTemplate<String, T> kafkaTemplate;

    /**
     * Sending event via Kafka
     * @param key
     * @param event
     */
    public void sendEvent(String key, T event){
        log.debug("✅ Kafka Sending event: {}", event);
        kafkaTemplate.send(key, event);
    }
}
