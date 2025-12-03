import { Typography, type TypographyProps } from "@mui/material"

const CTypography: React.FC<TypographyProps> = ({children, ...rest} ) => {
    return <Typography {...rest}>{children}</Typography>
}
export default CTypography