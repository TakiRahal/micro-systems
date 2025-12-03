package com.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.controller.EventController;
import com.user.dto.OfferEventDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaConsumerService {

    private final EventController eventController;

    public KafkaConsumerService(EventController eventController) {
        this.eventController = eventController;
    }

    /**
     * For Offer event
     * @param offerEvent
     * @throws JsonProcessingException
     */
    @KafkaListener(topics = "ADD_OFFER", groupId = "group_id")
    public void consume(@Payload String offerEvent) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        OfferEventDTO offerEventDTO = mapper.readValue(offerEvent, OfferEventDTO.class);
        System.out.println("📩 New order event received for user: " + offerEventDTO);
        eventController.publishUserEvent(offerEventDTO.toString());
    }
}
