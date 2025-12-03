package com.offer.mapper;

import com.offer.dto.AddOfferDTO;
import com.offer.dto.OfferDTO;
import com.offer.entity.Offer;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {})
public interface OfferMapper  extends EntityMapper<OfferDTO, Offer>{

    @Named("AddOfferDTOToOfferDTO")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "price", source = "price")
    OfferDTO addOfferDTOToOfferDTO(AddOfferDTO offerDTO);
}
