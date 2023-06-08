export type postsType = {
  
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  

}

export type DB = {
    posts : postsType[]
}

const db: DB = {
    posts : [
        {
          "id": "1",
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "blogId": "string",
        "blogName": "string"
        },
        {
        "id": "2",
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "blogId": "string",
        "blogName": "string"
        }
      ]
    }