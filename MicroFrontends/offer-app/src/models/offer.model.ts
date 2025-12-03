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

export interface Offer{
  id: number
  title: string
  description: string
  price: number | string
  userId: string
}