import { useMutation } from "@tanstack/react-query"
import { invokeWS } from "../../../../config/api-service"

const registerUser = (callback: (result: boolean) => void) => {
    return useMutation({
        mutationFn: (val) => invokeWS({
                                  url: `api/user/public/register`,
                                  method: 'POST',
                              }, val),
        onSuccess: (data) => {
            console.log("User created successfully:", data)
            callback(true)
        },
        onError: (error) => {
            console.error("Error creating user:", error)
            callback(false)
        }
    })
}
export {registerUser}