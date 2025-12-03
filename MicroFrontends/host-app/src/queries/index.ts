
export const LIST_QUERIES_KEY = {
    USER: {
        KEY_LIST_USER: 'KEY_LIST_USER',
        KEY_ADD_USER: 'KEY_ADD_USER',
        CURRENT_USER: 'CURRENT_USER',
    },
}

export const CURRENT_USER = {
    isLoggedIn: 'isLoggedIn',
    currentUser: 'currentUser',
    authentication: 'authentication'
}

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

export interface AccessGroup{
    manage: boolean
    manageMembers: boolean
    manageMembership: boolean
    view: boolean
    viewMembers: boolean
}

export interface Group{
    id: string
    name: string
    path: string
    access: AccessGroup
}