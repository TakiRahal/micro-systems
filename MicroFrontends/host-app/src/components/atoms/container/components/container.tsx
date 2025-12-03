import Container, { type BoxProps } from '@mui/material/Box';

const CContainer: React.FC<BoxProps> = ({children, ...rest} ) => {
    return <Container {...rest}>{children}</Container>
}
export default CContainer