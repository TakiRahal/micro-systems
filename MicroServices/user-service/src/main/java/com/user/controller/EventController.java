package com.user.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@RestController
@RequestMapping("/api/user")
public class EventController {
    private final Sinks.Many<String> sink = Sinks.many().multicast().onBackpressureBuffer();

    @GetMapping(value = "/public/user-events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamEvents() {
        return sink.asFlux();
    }

    // This is called when Kafka consumer receives an event
    public void publishUserEvent(String message) {
        sink.tryEmitNext(message);
    }
}
