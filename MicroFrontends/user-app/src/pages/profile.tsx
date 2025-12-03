import { useMemo } from "react";
import { CURRENT_USER } from "../constants/user.constant";
import PageContainer from "HostApp/PageContainer";
import { Formik } from "HostApp/Formik";
import Box from "HostApp/Box";
import Grid from "HostApp/Grid";
import FieldInput from "HostApp/FieldInput";
import DataTable from "HostApp/DataTable";
import List from "HostApp/List";
import ListItem from "HostApp/ListItem";
import ListItemAvatar from "HostApp/ListItemAvatar";
import Avatar from "HostApp/Avatar";
import ListItemText from "HostApp/ListItemText";
import Divider from "HostApp/Divider";
import React from "react";
import Typography from "HostApp/Typography";
import avatar from '../assets/palestine.png';

const Profile = () => {
    console.log('cachedData ', localStorage.getItem(CURRENT_USER.currentUser));
    const data = localStorage.getItem(CURRENT_USER.isLoggedIn) ? JSON.parse(localStorage.getItem(CURRENT_USER.currentUser)!) : {}

    
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
        <PageContainer title="Profile">
            <List sx={{ width: '100%' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Palestine" 
                                src={avatar} 
                                sx={{ width: 70, height: 70 }}/>
                    </ListItemAvatar>
                    <Box width='20px'/>
                    <ListItemText
                        primary={`${data?.firstName} ${data?.lastName}`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    ID:
                                </Typography>
                                {data.id}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
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
                        <Box sx={{ flexGrow: 1 }} mb={2} mt={4}>
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
export default Profile
