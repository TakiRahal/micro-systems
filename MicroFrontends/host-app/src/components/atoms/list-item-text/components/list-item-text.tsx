import { ListItemText, type ListItemTextProps } from "@mui/material"

const CListItemText: React.FC<ListItemTextProps> = ({children, ...rest} ) => {
    return <ListItemText {...rest}>{children}</ListItemText>
}
export default CListItemText