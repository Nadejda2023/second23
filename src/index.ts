import { DB } from "./db/db";


export const db : DB = {
  blogs: [
  {
    id: "ts",
    name: "yurii",
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
    id: "Leva",
    title: "First steps",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "Platon",
    title: "First words",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};

 