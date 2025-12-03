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
    USER: {
        KEY_LIST_USER: 'KEY_LIST_USER',
        KEY_ADD_USER: 'KEY_ADD_USER',
        CURRENT_USER: 'CURRENT_USER',
    },
    GROUP: {
        KEY_LIST_GROUP: 'KEY_LIST_GROUP'
    }
}