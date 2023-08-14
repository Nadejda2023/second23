import { defaultMaxListeners } from "events"

export type TPagination = {
    sortBy: string,
    sortDirection: 'asc' | 'desc'
    pageNumber: number,
    pageSize: number
    skip: number,
    searchNameTerm: any

    
}


export const getPaginationFromQuery =(query: any): TPagination => {
    

    const defaultValues: TPagination = {
        sortBy: 'createdAt',
        sortDirection:  'desc',//
        pageNumber: 1, //
        pageSize: 10, //
        skip: 0,//
        searchNameTerm: '' //
    }
    
 if(query.sortBy){
    defaultValues.sortBy = query.sortBy
 };

    if(query.sortDirection && query.sortDirection === 'asc') { 
         defaultValues.sortDirection = query.sortDirection 
    } ;

    
    if(query.pageNumber  || query.pageNumber <= 0) {
         defaultValues.pageNumber = +query.pageNumber 
    }; 

    
    if (query.pageSize) {
         defaultValues.pageSize = +query.pageSize 
    } ;
    if (query.searchNameTerm) {
        query.searchNameTerm = defaultValues.searchNameTerm = query.searchNameTerm 
    } ;
    
defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize
    return defaultValues
}