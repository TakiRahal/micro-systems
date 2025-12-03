import { List, type ListProps } from "@mui/material"

const CList: React.FC<ListProps> = ({children, ...rest} ) => {
    return <List {...rest}>{children}</List>
}
export default CList