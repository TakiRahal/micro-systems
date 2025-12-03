import { Grid, type GridProps } from '@mui/material';
const CGrid: React.FC<GridProps> = ({children, ...rest} ) => {
    return <Grid {...rest}>{children}</Grid>
}
export default CGrid