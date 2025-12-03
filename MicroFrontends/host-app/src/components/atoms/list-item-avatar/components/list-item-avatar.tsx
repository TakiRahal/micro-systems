import { ListItemAvatar, type ListItemAvatarProps } from "@mui/material"

const CListItemAvatar: React.FC<ListItemAvatarProps> = ({children, ...rest} ) => {
    return <ListItemAvatar {...rest}>{children}</ListItemAvatar>
}
export default CListItemAvatar