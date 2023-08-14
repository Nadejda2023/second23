import { defaultMaxListeners } from "events"

export type TPagination = {
    sortBy: string,
    sortDirection: 'asc' | 'desc'
    pageNumber: number,
    pageSize: number
    skip: number

    
}
const defaultSearchNameTerm = {}

export const getPaginationFromQuery =(query: any): TPagination => {
    

    const defaultValues: TPagination = {
        sortBy: 'createdAt',
        sortDirection:  'desc',
        pageNumber: 1,
        pageSize: 10,
        skip: 0,
        
    }
    let searchNameTerm: any = query.SearchNameTerm


    if(query.sortDirection && query.sortDirection === 'asc') { 
        query.sortDirection = defaultValues.sortDirection 
    } 

    
    if(!query.pageNumber  || query.pageNumber <= 0) {
        query.pageNumber =  defaultValues.pageNumber 
    } else {
        query.pageNumber = +query.pageNumber 
       if (query.pageNumber <= 0) {
        query.pageNumber = defaultValues.pageNumber
       }

    }
    if (!query.pageSize) {
        query.pageSize = defaultValues.pageSize
    } else {
        query.pageSize = +query.pageSize
        if (query.pageSize <= 0) {
            query.pageSize = defaultValues.pageSize
        }
    }
    if (!searchNameTerm) {
        searchNameTerm = defaultSearchNameTerm
    } else {
        searchNameTerm = {name: {$regex: searchNameTerm}}
    }

    




defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize
    return defaultValues
}