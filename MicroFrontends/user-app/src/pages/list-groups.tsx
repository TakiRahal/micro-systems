import DataTable from 'HostApp/DataTable';
import { useMemo } from 'react';
import PageContainer from 'HostApp/PageContainer';
import { getListGroups } from '../queries/user.query';

const ListGroups = () => {
    const { isPending, data } = getListGroups()

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
        <PageContainer title="List groups">
            <DataTable data={data} columns={columns} isLoading={isPending}/>
        </PageContainer>
    )
}
export default ListGroups