import { QueryClient } from "@tanstack/react-query"

// Create a client
const defaultOptions = {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
}
export const queryClient = new QueryClient({
    defaultOptions: defaultOptions
})

export const LIST_QUERIES_KEY = {
    OFFER: {
        KEY_LIST_OFFER: 'KEY_LIST_OFFER',
        KEY_ADD_OFFER: 'KEY_ADD_OFFER',
        KEY_UPDATE_OFFER: 'KEY_UPDATE_OFFER',
        KEY_OFFER_BY_ID: 'KEY_OFFER_BY_ID',
        CURRENT_USER: 'CURRENT_USER',
    }
}