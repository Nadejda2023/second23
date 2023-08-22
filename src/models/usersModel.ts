

    export type PaginatedUser<T> = {
        pagesCount: number,
        page: number,
        pageSize: number,
        totalCount: number,
        items: T[],
      }
      export type UsersModel =
      {
        id: string,
        login: string,
        email: string,
        createdAt: string,
        passwordSalt: string,
        passwordHash: string
      }

      export type UsersInputModel =
      {
        
        login: string,
        password: string
        email: string,
        
      }