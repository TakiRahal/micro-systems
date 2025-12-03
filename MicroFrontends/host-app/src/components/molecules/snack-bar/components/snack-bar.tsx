import { Snackbar, type SnackbarProps } from '@mui/material';

const CSnackbar: React.FC<SnackbarProps> = ({...rest} ) => {
    return <Snackbar {...rest} />
}
export default CSnackbar