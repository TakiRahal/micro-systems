import { Stack, type StackProps } from "@mui/material"

const CStack: React.FC<StackProps> = ({children, ...rest}) => {
    return <Stack {...rest}>{children}</Stack>
}
export default CStack