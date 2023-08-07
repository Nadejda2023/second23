import { defaultMaxListeners } from "events"

export type TPagination = {
    sortBy: string,
    sortDirection: 'asc' | 'desc'
    pageNumber: number,
    pageSize: number
    skip: number
    
}

export const getPaginationFromQuery =(query: any): TPagination => {
    const defaultValues: TPagination = {
        sortBy: 'createdAt',
        sortDirection:  'desc',
        pageNumber: 1,
        pageSize: 10,
        skip: 0
    }

    if(query.sortDirection &&query.sortDirection === 'asc') defaultValues.sortDirection = query.sortDirection



defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize
    return defaultValues
}