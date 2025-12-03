import { useMutation, useQuery } from "@tanstack/react-query"
import { LIST_QUERIES_KEY } from "."
import { invokeWS } from "HostApp/ApiService"
import type { CurrentUser, User } from "src/models/user.model"
import type { Group } from "src/models/group.model"


/**
 * 
 * @returns List of users
 */
const getListUsers = () => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.USER.KEY_LIST_USER], 
        queryFn: () => invokeWS<User[]>({
                                    url: `api/user/private/list-users`,
                                    method: 'GET',
                                    hideNotification: false
                            }),
    })
}


/**
 * * Add a new user
 */
const addUser = (callback: ({result, error}: {result: boolean, error?: any}) => void) => {
    return useMutation({
        mutationFn: (val) => invokeWS({
                                  url: `api/user/public/register`,
                                  method: 'POST',
                              }, val),
        onSuccess: (data) => {
            console.log("User created successfully:", data)
            callback({
                result: true,
            })
        },
        onError: (error) => {
            console.error("Error creating user:", error)
            callback({
                result: false,
                error: error
            })
        }
    })
}


/**
 * 
 * @param id * @returns User by ID
 * @returns 
 */
const getUserById = (id: string) => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.USER.KEY_LIST_USER], 
        queryFn: () => invokeWS<User>({
                                    url: `api/user/private/${id}`,
                                    method: 'GET',
                                    hideNotification: false
                            }),
    })
}


/**
 * 
 * @param enabled * @returns Current user
 * @returns 
 */
const getCurrentUser = (enabled: boolean) => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.USER.CURRENT_USER], 
        queryFn: () => invokeWS<CurrentUser>({
                            url: `${import.meta.env.VITE_USER_SERVICE_BASIC_URL}private/me`,
                            method: 'GET'
                    }).then((result: any) => {
                        localStorage.setItem('isLoggedIn', 'true')
                        return {
                            currentUser: result,
                            isLoggedIn: true
                        }
                    }),
        enabled: enabled,
        initialData: {
            currentUser: {},
            isLoggedIn: false
        },  
    })
}


/**
 * 
 * @returns 
 */
const getListGroups = () => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.GROUP.KEY_LIST_GROUP], 
        queryFn: () => invokeWS<Group[]>({
                                    url: `api/user/private/list-groups`,
                                    method: 'GET',
                                    hideNotification: false
                            }),
    })
}


export {getListUsers, addUser, getUserById, getCurrentUser, getListGroups}