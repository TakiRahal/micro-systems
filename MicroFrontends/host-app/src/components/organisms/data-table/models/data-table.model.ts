export type DataTableProps<T> = {
    data?: T[],
    columns: {
        header: string,
        accessor: string // keyof T
    }[]
    isLoading?: boolean
    messageNoDataFound?: string
}


export type ActionsDataTableColumn<T> = {
    accessor :  string 
    actions? :  Actions<T>[]
    header: string
}

export type Actions<T> = {
    icon: string,
    label?: string,
    isShown?: boolean | ((data: T) => boolean),
    disabled?: boolean
    color?: any,
    onClick?: (data: T) => void,
}