package com.offer.exception.advice;

import com.offer.exception.BadRequestException;
import com.offer.exception.ErrorMessage;
import com.offer.exception.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class AdviceExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(AdviceExceptionHandler.class);

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorMessage> handleResourceNotFoundException(NotFoundException ex, WebRequest request) {
        log.error("NotFoundException = An exception have been occurred please see logging error:  {}", ex.getMessage());
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorMessage> handleResourceBadRequestException(BadRequestException ex, WebRequest request) {
        log.error("BadRequestException = An exception have been occurred please see logging error:  {}", ex.getMessage());
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
