
import {MongoClient} from 'mongodb';
import { DB, postsType } from "..";
import * as dotenv from 'dotenv'
dotenv.config()

import { BlogsViewModel } from '../models/blogsModel';


dotenv.config()



const url = process.env.MONGO_URL 
console.log('url:', url)
if(!url) {
  throw new Error('! Url doesn\'t found')
}


export type blogsType = {
  id:  string,
  name: string,
  description: string,
  websiteUrl: string, 
  createdAt: string,
  isMembership: boolean 
}

export const client = new MongoClient(url);
//const dbN = client.db
//export const blogsCollection = dbN.collection<blogsType>;
//export const postsCollection = dbN.collection<postsType>;
export const blogsCollection = client.db("project").collection<BlogsViewModel>("blogs")

export async function runDB() {
  try{
    await client.connect();
    await client.db().command({ ping:1 });
    console.log("Connected successfully to mongo server");

  } catch {
    console.log("Can't connected to db");
    await client.close();
  }
}

export const db : DB = { //нужно ли это вообще если есть модельки
  blogs: [
  {
    id: "string",
    name: "Nadejda",
    description: "string",
    websiteUrl: "string",
    createdAt: "2023-07-13T14:09:36.550Z",
  isMembership: false
    
  },
  {
    id: "string",
    name: "string",
    description: "string",
    websiteUrl: "string",
    createdAt: "2023-07-13T14:09:36.550Z",
  isMembership: false
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

