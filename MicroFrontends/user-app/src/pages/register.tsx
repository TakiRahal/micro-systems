import Box from "HostApp/Box"
import Container from "HostApp/Container"
import { Formik } from "HostApp/Formik"
import PageContainer from "HostApp/PageContainer"
import { initialValues, registerSchema } from "../schema/register.schema"
import Grid from "HostApp/Grid"
import FieldInput from "HostApp/FieldInput"
import Stack from "HostApp/Stack"
import Button from "HostApp/Button"
import { useNavigate } from "@tanstack/react-router"
import { addUser } from "../queries/user.query"
import { useState } from "react"
import IconButton from "HostApp/IconButton"
import Snackbar from "HostApp/Snackbar"

const Register = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('User registred successfully')
    
    const callBackResult = ({result, error}: {result: boolean, error?: any}) => {
        setOpen(true);
        if( result ){
            setTimeout(() => {
                navigate({ to: '/'})
            }, 1000)
        }
        else{
            setMessage(error?.response?.data?.message)
        }
    }
    const { mutate: createUser, isPending } = addUser(callBackResult)

    const onSubmit = (values: any) => {
        createUser(values)
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
            title="Register new user">
            <Container maxWidth="sm">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, resetForm }: any) => (
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ flexGrow: 1 }} mb={2}>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <FieldInput name="username" label="Username" fullWidth/>
                                    </Grid>
                                    <Grid size={12}>
                                        <FieldInput name="firstName" label="FirstName" fullWidth/>
                                    </Grid>
                                    <Grid size={12}>
                                        <FieldInput name="lastName" label="LastName" fullWidth/>
                                    </Grid>
                                    <Grid size={12}>
                                        <FieldInput name="email" label="Email" fullWidth/>
                                    </Grid>
                                    <Grid size={12}>
                                        <FieldInput name="password" label="Password" fullWidth type="password"/>
                                    </Grid>
                                    <Grid size={12}>
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => resetForm()}>
                                                Reset
                                            </Button>
                                            <Button
                                                loading={isPending}
                                                type="submit"
                                                variant="contained"
                                                color="secondary">
                                                Register new user
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Container>

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                action={action}
            />

        </PageContainer>
    )
}
export default Register