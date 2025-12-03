import FieldInput from "../../../atoms/field-input/components/field-input";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { Formik } from "formik";
import { registerUser } from "../queries/register.query";
import PageContainer from "../../../organisms/page-container/components/page-container";
import { useNavigate } from "@tanstack/react-router";
import { initialValues, registerSchema } from "../schema/register.schema";

const Register: React.FC = () => {
    const navigate = useNavigate()
    const callBackResult = (result: boolean) => {
        if( result ){
            navigate({ to: '/'})
        }
    }
    const { mutate: createUser, isPending } = registerUser(callBackResult)
    const onSubmit = (values: any) => {
        createUser(values)
    }
    return (
        <Box pt={10} width={'100%'} >
            <PageContainer title="" >
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
            </PageContainer>
        </Box>
    )
}
export default Register;