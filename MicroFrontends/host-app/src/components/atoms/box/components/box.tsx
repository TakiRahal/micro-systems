import Box, { type BoxProps } from '@mui/material/Box';

const CBox: React.FC<BoxProps> = ({children, ...rest} ) => {
    return <Box {...rest}>{children}</Box>
}
export default CBox