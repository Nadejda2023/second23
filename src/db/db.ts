import { DB } from "..";


export const db: DB = {
  blogs: [
  {
    id: "ts",
    name: "string",
    description: "string",
    websiteUrl: "string"
  },
  {
    id: "js",
    name: "string",
    description: "string",
    websiteUrl: "string"
    }
  ],
  posts: [    
  {
    id: "First",
    title: "steps",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "second",
    title: "words",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};
