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