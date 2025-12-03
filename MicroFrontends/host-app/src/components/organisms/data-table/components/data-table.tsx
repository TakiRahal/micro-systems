import Paper from '@mui/material/Paper';
import type { Actions, ActionsDataTableColumn, DataTableProps } from '../models/data-table.model';
import { Box, ButtonGroup, CircularProgress, IconButton, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ListIcons } from '../../../../config/constant';

const DataTable = <T,>({ data, columns, isLoading, messageNoDataFound='No data found' }: DataTableProps<T>) => {

    const columnHelper = createColumnHelper<T>()
    const _actions: ActionsDataTableColumn<T> = columns?.find((_col: any) => _col?.actions?.length) as ActionsDataTableColumn<T>
    const tableColumns = columns?.filter(item => item.accessor!=='action')?.map((col) => {
        const accessor: any = col?.accessor
        return columnHelper.accessor(accessor, {
                cell: info => info.getValue(),  
                header: () => <span>{col.header}</span>,
        })
    })

    const table = useReactTable({
        data: data ?? [],
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    if( isLoading ){
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
    }

    if( !data?.length && !isLoading ){
        return (
            <Paper elevation={3}>
                <Box p={2} textAlign={'center'}>
                    <Typography variant="h5" gutterBottom>{messageNoDataFound}</Typography>
                </Box>
            </Paper>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="a dense table">
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                            )}
                                </TableCell>
                            ))}
                            {
                                _actions && (
                                    <TableCell>Actions</TableCell>
                                )
                            }
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell component="th" scope="row" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                                {
                                    _actions && (
                                        <TableCell>
                                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                                {
                                                     _actions?.actions?.map((action: Actions<T>, index: number) => (
                                                        <IconButton 
                                                            key={index}  
                                                            aria-label={action.icon} 
                                                            color={action.color || "secondary"}
                                                            onClick={() => action.onClick?.(row.original)} >
                                                            {ListIcons[action.icon]}
                                                        </IconButton>
                                                     ))
                                                }
                                            </ButtonGroup>
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DataTable