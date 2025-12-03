import { useMemo, useState } from "react"
import { deleteOffer, getListOffers } from "../queries/offer.query"
import DataTable from "HostApp/DataTable"
import type { Offer } from "../models/offer.model"
import { useNavigate } from "@tanstack/react-router"
import PageContainer from "HostApp/PageContainer"
import Stack from "HostApp/Stack"
import Button from "HostApp/Button"
import Dialog from "HostApp/Dialog"

const ListOffers = () => {
    const navigate = useNavigate()
    const {data, isPending} = getListOffers(0)
    const [open, setOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<Partial<Offer>>({})
    

    const callbackDelete = (result: boolean) => {
        if( result ){
            setOpen(false)
        }
    }
    const { mutate: fnDeleteOffer } = deleteOffer(callbackDelete)

    const actionDeleteOffer = () => {
        fnDeleteOffer(selectedOffer.id!)
    }
    
    const columns = useMemo(() => [
          {
              header: 'Id',
              accessor: 'id'
          },
          {
              header: 'Title',
              accessor: 'title'
          },
          {
              header: 'Description',
              accessor: 'description'
          },
          {
              header: 'Price',
              accessor: 'price'
          }
          ,
          {
              header: 'userId',
              accessor: 'userId'
          },
          {
            header: 'Actions',
            accessor: 'action',
            actions: [
                {
                    label: 'Details',
                    icon: 'Visibility',
                    onClick: (offer: Offer) => {
                        navigate({
                          to: `/main/offer/update/${offer.id}`,
                        })
                    }
                },
                {
                    label: 'Delete',
                    icon: 'DeleteIcon',
                    onClick: (offer: Offer) => {
                        setSelectedOffer(offer)
                        setOpen(true)
                    }
                },
            ]
          } 
    ], []);

    return (
        <PageContainer 
            title="List offers"
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                        variant="contained"
                        onClick={() => navigate({
                          to: `/main/offer/add`,
                        })}
                        startIcon={'AddIcon'} 
                        color="secondary">
                        Create
                    </Button>
                </Stack>
            }>
            <DataTable data={data?.content} columns={columns} isLoading={isPending}/>

            <Dialog open={open} 
                    onClose={() => setOpen(false)} 
                    dialogTitle="Delete offer" 
                    dialogContentText="Are you sur to delete this offer"
                    dialogActions={
                        <>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={actionDeleteOffer} autoFocus color="error">
                                Delete
                            </Button>
                        </>
                    }/>
        </PageContainer>
    )
}
export default ListOffers