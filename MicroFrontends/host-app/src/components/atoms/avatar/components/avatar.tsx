import { Avatar, type AvatarProps } from "@mui/material"

const CAvatar: React.FC<AvatarProps> = ({children, ...rest} ) => {
    return <Avatar {...rest}>{children}</Avatar>
}
export default CAvatar