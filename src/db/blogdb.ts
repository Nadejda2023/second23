export type blogsType = {
  
    id: string,
    name: string,
    description: string,
    websiteUrl: string
     
  }

export type DB = {
    blogs : blogsType[]
}

const db: DB = {
    blogs: [
      {
        "id": "0",
        "name": "string",
        "description": "string",
        "websiteUrl": "string"
      },
      {
        "id": "1",
        "name": "string",
        "description": "string",
        "websiteUrl": "string"
      }
  
    ]
}