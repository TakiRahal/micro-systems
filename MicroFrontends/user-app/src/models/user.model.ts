import type { Group } from "./group.model"

export interface User{
    id: string,
    username: string
    email: string
    firstName: string
    lastName: string
    groups?: Group[]
}

export type CurrentUser = {
    currentUser: User, 
    isLoggedIn: boolean
}    