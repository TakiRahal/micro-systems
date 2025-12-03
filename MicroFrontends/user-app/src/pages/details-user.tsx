import { useParams } from "@tanstack/react-router";
import { getUserById } from "../queries/user.query";
import Box from "HostApp/Box";
import Grid from "HostApp/Grid";
import { Formik } from "HostApp/Formik";
import FieldInput from "HostApp/FieldInput";
import DataTable from "HostApp/DataTable";
import { useMemo } from "react";
import PageContainer from "HostApp/PageContainer";

const DetailsUser = () => {
    const { id } = useParams({ from: '/main/user/details/$id' });
    const {data} = getUserById(id)
    console.log('data ', data);
    
    const columns = useMemo(() => [
                      {
                          header: 'Id',
                          accessor: 'id'
                      },
                      {
                          header: 'Name',
                          accessor: 'name'
                      },
                      {
                          header: 'Path',
                          accessor: 'path'
                      }
                  ], []);
    
    return (
        <PageContainer title="User Details">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    username: data?.username ?? '',
                    email: data?.email ?? '',
                    firstName: data?.firstName ?? '',
                    lastName: data?.lastName ?? '',
                    gender: ''
                }}
                onSubmit={(values: any) => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ handleSubmit }: any) => (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ flexGrow: 1 }} mb={2}>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <FieldInput name="username" label="Username" disabled={true} fullWidth/>
                                </Grid>
                                <Grid size={4}>
                                    <FieldInput name="email" label="Email" disabled={true} fullWidth/>
                                </Grid>
                                <Grid size={4}>
                                    <FieldInput name="firstName" label="FirstName" disabled={true} fullWidth/>
                                </Grid>
                                <Grid size={4}>
                                    <FieldInput name="lastName" label="LastName" disabled={true} fullWidth/>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>

            <DataTable data={data?.groups} columns={columns} messageNoDataFound='No group found'/>
        </PageContainer>
    )
}
export default DetailsUser