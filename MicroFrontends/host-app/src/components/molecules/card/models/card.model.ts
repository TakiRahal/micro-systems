import type { ReactNode } from "react"

export type CardProps = {
    cardMedia?: {
        image: string,
        title: string
    }
    topTitle?: ReactNode
    title?: ReactNode
    subTitle?: ReactNode
    body?: ReactNode
    cardActions?: ReactNode
}