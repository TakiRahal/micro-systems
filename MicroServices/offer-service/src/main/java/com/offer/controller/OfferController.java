package com.offer.controller;


import com.offer.dto.AddOfferDTO;
import com.offer.dto.OfferDTO;
import com.offer.dto.UpdateOfferDTO;
import com.offer.service.OfferService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
@RequestMapping("/api/offer")
@AllArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @GetMapping("/public")
    public String getOfferById(){
        return "Hello Offer by Id";
    }

    /**
     *
     * @param jwt
     * @param addOfferDTO
     * @return
     */
    @PostMapping("/private/add")
    public ResponseEntity<OfferDTO> addOffer(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody AddOfferDTO addOfferDTO){
        var result = offerService.save(addOfferDTO, jwt);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }


    /**
     *
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/private/list")
    public ResponseEntity<?> getAllOffers(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size){
        var result = offerService.getAllOffers(PageRequest.of(page, size));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    /**
     *
     * @param id
     * @return
     */
    @GetMapping("/private/{id}")
    public ResponseEntity<?> getOfferById(@PathVariable String id){
        return new ResponseEntity<>(offerService.getOfferById(id), HttpStatus.OK);
    }

    /**
     *
     * @param id
     * @return
     */
    @PutMapping("/private/{id}")
    public ResponseEntity<?> updateOffer(@PathVariable String id, @AuthenticationPrincipal Jwt jwt, @Valid @RequestBody UpdateOfferDTO updateOfferDTO){
        return new ResponseEntity<>(offerService.update(id, updateOfferDTO, jwt), HttpStatus.OK);
    }


    /**
     *
     * @param id
     * @return
     */
    @DeleteMapping("/private/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable String id, @AuthenticationPrincipal Jwt jwt){
        return new ResponseEntity<>(offerService.delete(id, jwt), HttpStatus.OK);
    }
}
