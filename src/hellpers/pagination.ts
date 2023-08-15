import { defaultMaxListeners } from "events"

export type TPagination = {
    sortBy: string,
    sortDirection: 'asc' | 'desc'
    pageNumber: number,
    pageSize: number
    skip: number,
   searchNameTerm?: string

    
}


export const getPaginationFromQuery =(query: any): TPagination => {
    

    const defaultValues: TPagination = {
        sortBy: 'createdAt',
        sortDirection:  'desc',//
        pageNumber: 1, //
        pageSize: 10, //
        skip: 0,//
       
    }
    
 if(query.sortBy){
    defaultValues.sortBy = query.sortBy
 };

    if(query.sortDirection && query.sortDirection === 'asc') { 
         defaultValues.sortDirection = query.sortDirection 
    } ;

    
    if(query.pageNumber  && query.pageNumber > 0) {
         defaultValues.pageNumber = +query.pageNumber 
    }; 

    
    if (query.pageSize && query.pageSize > 0) {
         defaultValues.pageSize = +query.pageSize 
    } ;
       
    
defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize
    return defaultValues
}

export function getSearchNameTermFromQuery(searchNameTerm:  string | undefined): {searchNameTerm: string}{
    const defaultNameTerm = {searchNameTerm: ''};
    if(searchNameTerm) {
        defaultNameTerm.searchNameTerm = searchNameTerm;
        return defaultNameTerm;
    }
    
    return defaultNameTerm;
}