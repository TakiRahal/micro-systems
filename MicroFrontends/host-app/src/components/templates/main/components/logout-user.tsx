import { type RefObject, useImperativeHandle, useRef } from "react";


const logoutUrl = `${window.location.origin}/path-user-logout`

interface LogoutProps {
  ref: RefObject<{ logout(): void; }>;
}
const LogoutUser = ({ ref }: LogoutProps) => {
    const refBtnLogout: any = useRef(null)
    useImperativeHandle(ref, () => ({
        logout() {
            localStorage.removeItem('isLoggedIn')
            refBtnLogout?.current?.click()
        },
    }), []);  

  return (
    <form method="POST" action={logoutUrl} style={{visibility: 'hidden', width:0}}>
        <input type="submit" id="submitBtn" value="Submit form" ref={refBtnLogout} />
    </form>
  );
}

export default LogoutUser;