//import { postsArrayType } from "../repositories/posts-repository";
//import { blogsType } from "../repositories/blogs-repository";

import { DB } from "..";

//export type DB = any;

export const db : DB = {
  blogs: [
  {
    id: "01",
    name: "Nadejda",
    description: "string",
    websiteUrl: "string"
  },
  {
    id: "02",
    name: "string",
    description: "string",
    websiteUrl: "string"
    }
  ],
  posts: [    
  {
    id: "01",
    title: "First",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "02",
    title: "First",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};

