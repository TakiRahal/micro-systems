import { ListItem, type ListItemProps } from "@mui/material"

const CListItem: React.FC<ListItemProps> = ({children, ...rest} ) => {
    return <ListItem {...rest}>{children}</ListItem>
}
export default CListItem