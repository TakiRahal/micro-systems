export interface Page<T>{
    content: T[]
    totalElements: number
    totalPages: number
}

export const InitialPage = {
    content: [],
    totalElements: 0,
    totalPages: 0
}