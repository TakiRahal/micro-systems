import { useQuery } from "@tanstack/react-query"
import { invokeWS } from "../config/api-service"
import { CURRENT_USER, LIST_QUERIES_KEY, type CurrentUser } from "."

const getCurrentUser = (enabled: boolean) => {
    return useQuery({ 
        queryKey: [LIST_QUERIES_KEY.USER.CURRENT_USER], 
        queryFn: () => invokeWS<CurrentUser>({
                            url: `api/user/private/me`,
                            method: 'GET'
                    }).then((result: any) => {
                        localStorage.setItem(CURRENT_USER.isLoggedIn, 'true')
                        localStorage.setItem(CURRENT_USER.currentUser, JSON.stringify(result))
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
export {getCurrentUser}