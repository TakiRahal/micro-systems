import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { ReactNode } from 'react';

type CDialogProps = {
    open: boolean
    onClose: () => void
    dialogTitle?: string
    dialogContentText?: string
    dialogActions?: ReactNode
}
const CDialog = ({open, onClose, dialogTitle, dialogContentText, dialogActions}: CDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            {
                dialogTitle && 
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
            }
            {
                dialogContentText && 
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{dialogContentText}</DialogContentText>
                </DialogContent>
            }
            
            <DialogActions>{dialogActions}</DialogActions>
        </Dialog>
    )
}
export default CDialog