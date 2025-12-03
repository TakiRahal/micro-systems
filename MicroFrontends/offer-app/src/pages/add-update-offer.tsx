import PageContainer from "HostApp/PageContainer"
import Stack from "HostApp/Stack"
import Button from "HostApp/Button"
import { useNavigate, useParams, useRouter } from "@tanstack/react-router"
import { Formik } from "HostApp/Formik"
import { addUpdateOfferSchema, initialValues } from "../schema/offer.schema"
import type { Offer } from "../models/offer.model"
import Box from "HostApp/Box"
import Grid from "HostApp/Grid"
import FieldInput from "HostApp/FieldInput"
import { addOffer, getOfferById, updateOffer } from "../queries/offer.query"
import CircularProgress from "HostApp/CircularProgress"
import Snackbar from "HostApp/Snackbar"
import { useState } from "react"
import IconButton from "HostApp/IconButton"

const AddUpdateOffer = () => {
    const router = useRouter()
    const navigation = useNavigate()
    const { id } = useParams({ strict: false });
    const [open, setOpen] = useState(false);
    
    const {data: offerDetails, isPending: isPendingOfferDetails} = getOfferById(id)

    const callBackResult = (result: boolean) => {
        if( result ){
            setOpen(true);
            setTimeout(() => {
                navigation({
                    to: '/main/offer/list'
                })
            }, 1000)
        }
    }

    const { mutate: createOffer, isPending: isPendingCreateOffer } = addOffer(callBackResult)
    const { mutate: modifyOffer, isPending: isPendingModifyOffer } = updateOffer(callBackResult);

    const onSubmit = (values: Partial<Offer>) => {
        id ? modifyOffer({values}) : createOffer({values})
    }
    
    if( id && isPendingOfferDetails ){
        return  <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                icon='CloseIcon'
            >
            </IconButton>
        </>
    );

    return (
        <PageContainer 
            title="Add offer"
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                        variant="contained"
                        onClick={() => router.history.back()}
                        startIcon={'ArrowBackIos'} 
                        color="secondary">
                        Back
                    </Button>
                </Stack>
            }>
            
            <Formik
                enableReinitialize={true}
                initialValues={id ? offerDetails : initialValues}
                validationSchema={addUpdateOfferSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit, resetForm }: any) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ flexGrow: 1 }} mb={2}>
                                <Grid container spacing={2} size={4}>
                                    {
                                        id && 
                                            <Grid size={6} offset={3}>
                                                <FieldInput name="id" label="ID" disabled={true} fullWidth/>
                                            </Grid>
                                    }
                                    
                                    <Grid size={6} offset={3}>
                                        <FieldInput name="title" label="Title" fullWidth/>
                                    </Grid>
                                    <Grid size={6} offset={3}>
                                        <FieldInput name="description" label="Description" fullWidth/>
                                    </Grid>
                                    <Grid size={6} offset={3}>
                                        <FieldInput name="price" label="Price" fullWidth/>
                                    </Grid>
                                    <Grid size={6} offset={3}>
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => resetForm()}>
                                                Reset
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                loading={isPendingCreateOffer || isPendingModifyOffer}>
                                                {id ? 'Update' : 'Add Offer'}
                                            </Button>
                                        </Stack>
                                    </Grid>

                                </Grid>
                            </Box>
                        </form>
                    )
                }}
            </Formik>

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={id ? 'Updated offer successfully' : 'Added offer successfully'}
                action={action}
            />
        </PageContainer>
    )
}
export default AddUpdateOffer