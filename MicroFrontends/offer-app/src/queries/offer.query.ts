import { useMutation, useQuery } from "@tanstack/react-query"
import { LIST_QUERIES_KEY, queryClient } from "."
import { invokeWS } from "HostApp/ApiService"
import { InitialPage, type Offer, type Page } from "../models/offer.model"

/**
 * 
 * @param page 
 * @param size 
 * @returns 
 */
const getListOffers = (page=0, size=10) => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.OFFER.KEY_LIST_OFFER, page], 
        queryFn: () => invokeWS<Page<Offer>>({
                                    url: `api/offer/private/list?page=${page}&size=${size}`,
                                    method: 'GET',
                                    hideNotification: false
                            }),
        initialData: InitialPage
    })
}


/**
 * 
 * @param id 
 * @returns 
 */
const getOfferById = (id: string) => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.OFFER.KEY_OFFER_BY_ID, id], 
        queryFn: () => invokeWS<Offer>({
                                    url: `api/offer/private/${id}`,
                                    method: 'GET',
                            }),
        enabled: !!id,   
    })
}

/**
 * 
 * @returns Add new offer
 */
const addOffer = (callback: (result: boolean) => void) => {
    return useMutation({
        mutationFn: (val: {values: Partial<Offer>}) => invokeWS<Partial<Offer>>({
                                  url: `api/offer/private/add`,
                                  method: 'POST',
                              }, val.values),
        onSuccess: (data) => {
            console.log("Offer created successfully:", data)
            callback(true)
        },
        onError: (error) => {
            console.error("Error creating offer:", error)
            callback(false)
        }
    })
}

/**
 * Update offer 
 * @param callback 
 * @returns 
 */
const updateOffer = (callback: (result: boolean) => void) => {
    return useMutation({
        mutationFn: (val: {values: Partial<Offer>}) => invokeWS<Partial<Offer>>({
                                  url: `api/offer/private/${val.values.id}`,
                                  method: 'PUT',
                              }, val.values),
        onSuccess: (data) => {
            console.log("Offer updated successfully:", data)
            callback(true)
        },
        onError: (error) => {
            console.error("Error update:", error)
            callback(false)
        }
    })
}

/**
 * Delete offer
 * @param callback 
 * @returns 
 */
const deleteOffer = (callback: (result: boolean) => void) => {
    return useMutation({
        mutationFn: (id: number) => invokeWS({
                                  url: `api/offer/private/${id}`,
                                  method: 'DELETE',
                              }),
        onSuccess: (data) => {
            console.log("Offer deleted successfully:", data)
            queryClient.invalidateQueries({ queryKey: [LIST_QUERIES_KEY.OFFER.KEY_LIST_OFFER] });
            callback(true)
        },
        onError: (error) => {
            console.error("Error delete:", error)
            callback(false)
        }
    });
}
export {getListOffers, getOfferById, addOffer, updateOffer, deleteOffer}