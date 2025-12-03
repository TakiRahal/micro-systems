import DataTable from 'HostApp/DataTable';
import { getListUsers } from '../queries/user.query';
import type { User } from 'src/models/user.model';
import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Stack from 'HostApp/Stack';
import PageContainer from 'HostApp/PageContainer';
import Button from 'HostApp/Button';

const ListUsers = () => {
    const {data, isPending} = getListUsers()
    const navigate = useNavigate()

    const columns = useMemo(() => [
        {
            header: 'Id',
            accessor: 'id'
        },
        {
            header: 'username',
            accessor: 'username'
        },
        {
            header: 'Email',
            accessor: 'email'
        },
        {
            header: 'FirstName',
            accessor: 'firstName'
        }
        ,
        {
            header: 'LastName',
            accessor: 'lastName'
        },
        {
            header: 'Actions',
            accessor: 'action',
            actions: [
                {
                    label: 'Details',
                    icon: 'Visibility',
                    onClick: (user: User) => {
                        console.log('User details clicked', user);
                        navigate({
                          to: `/main/user/details/${user.id}`,
                        })
                    }
                },
            ]
        }
    ], []);

    return (
        <PageContainer 
            title="List users"
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                        variant="contained"
                        onClick={() => navigate({
                          to: `/main/user/register`,
                        })}
                        startIcon={'AddIcon'} 
                        color="secondary">
                        Register new user
                    </Button>
                </Stack>
            }>
            <DataTable data={data} columns={columns} isLoading={isPending}/>
        </PageContainer>
    )
}
export default ListUsers