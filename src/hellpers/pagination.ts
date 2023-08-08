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

    if(query.sortDirection && query.sortDirection === 'asc') { 
        defaultValues.sortDirection = query.sortDirection
    }
    if(query.pageNumber === 0 || query.pageNumber <= 0) {
        defaultValues.pageNumber = query.pageNumber
    }
    if(query.pageSize === 0 ||  query.pageSize <= 0) {
        defaultValues.pageSize = query.pageSize
    } 
    




defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize
    return defaultValues
}