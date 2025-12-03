package com.offer.service.impl;

import com.offer.dto.AddOfferDTO;
import com.offer.dto.OfferDTO;
import com.offer.dto.OfferEventDTO;
import com.offer.dto.UpdateOfferDTO;
import com.offer.entity.Offer;
import com.offer.enums.OfferEnum;
import com.offer.exception.BadRequestException;
import com.offer.exception.NotFoundException;
import com.offer.mapper.OfferMapper;
import com.offer.repository.OfferRepository;
import com.offer.service.KafkaProducerService;
import com.offer.service.OfferService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;
    private final OfferMapper offerMapper;
    private final KafkaProducerService<OfferEventDTO> kafkaProducerService;

    @CacheEvict(value = "getAllOffersCache", allEntries = true)
    @Override
    public OfferDTO save(AddOfferDTO addOfferDTO, Jwt jwt) {
        OfferDTO offerDTO = offerMapper.addOfferDTOToOfferDTO(addOfferDTO);
        offerDTO.setUserId(jwt.getClaim("sub"));
        Offer offer = offerRepository.save(offerMapper.toEntity(offerDTO));

        // Send Kafka event
        OfferEventDTO event = OfferEventDTO.builder()
                .productId(offer.getId())
                .status(offer.getDescription())
                .userId(offer.getUserId())
                .build();
        kafkaProducerService.sendEvent(OfferEnum.ADD_OFFER.name(), event);
        return offerMapper.toDto(offer);
    }

    @Cacheable(value = "getAllOffersCache")
    @Override
    public Page<OfferDTO> getAllOffers(PageRequest pageRequest) {
        return offerRepository.findAll(pageRequest).map(offerMapper::toDto);
    }

    @Cacheable(value = "offerCache", key = "#id")
    @Override
    public OfferDTO getOfferById(String id) {
        return offerMapper.toDto(
                offerRepository.findById(id).orElseThrow(() -> new NotFoundException("Offer not found"))
        );
    }

    @CacheEvict(value = "getAllOffersCache", allEntries = true)
    @CachePut(value = "offerCache", key = "#id")
    @Override
    public OfferDTO update(String id, UpdateOfferDTO updateOfferDTO, Jwt jwt) {
        if( !updateOfferDTO.getId().equals(id)) {
            throw new BadRequestException("Invalid data");
        }
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new NotFoundException("Offer not found"));
        if( !offer.getUserId().equals(jwt.getClaim("sub")) ) {
            throw new BadRequestException("Invalid data");
        }
        offer.setTitle(updateOfferDTO.getTitle());
        offer.setDescription(updateOfferDTO.getDescription());
        offer.setPrice(updateOfferDTO.getPrice());

        // Send Kafka event
        OfferEventDTO event = OfferEventDTO.builder()
                .productId(offer.getId())
                .status(offer.getDescription())
                .userId(offer.getUserId())
                .build();
        kafkaProducerService.sendEvent(OfferEnum.UPDATE_OFFER.name(), event);
        return offerMapper.toDto(offerRepository.save(offer));
    }

    @CacheEvict(value = "getAllOffersCache", allEntries = true)
    @Override
    public Boolean delete(String id, Jwt jwt) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new NotFoundException("Offer not found"));
        if( !offer.getUserId().equals(jwt.getClaim("sub")) ) {
            throw new BadRequestException("Invalid data");
        }
        offerRepository.deleteById(id);
        return true;
    }
}
