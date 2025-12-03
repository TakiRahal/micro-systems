package com.offer.service;

import com.offer.dto.AddOfferDTO;
import com.offer.dto.OfferDTO;
import com.offer.dto.UpdateOfferDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.oauth2.jwt.Jwt;

public interface OfferService {

    OfferDTO save(AddOfferDTO offerDTO, Jwt jwt);
    OfferDTO getOfferById(String id);
    Page<OfferDTO> getAllOffers(PageRequest pageRequest);
    OfferDTO update( String id, UpdateOfferDTO updateOfferDTO, Jwt jwt);
    Boolean delete( String id, Jwt jwt);
}
