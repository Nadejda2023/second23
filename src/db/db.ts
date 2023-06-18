import { DB } from "..";


export const db: DB = {
  blogs: [
  {
    id: "1",
    name: "string",
    description: "string",
    websiteUrl: "string"
  },
  {
    id: "2",
    name: "string",
    description: "string",
    websiteUrl: "string"
    }
  ],
  posts: [    
  {
    id: "2",
    title: "step",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "1",
    title: "words",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};
export type errorsType = { 
      message: string,
      field: string
  
}
export const errorsMessage = [
    {
      message: "string",
      field: "string"
    }
  
]
