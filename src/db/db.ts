
import {MongoClient} from 'mongodb';
import { DB, postsType } from "..";
import dotenv from 'dotenv'
import { blogsType } from '../repositories/blogs-db1-repository';
dotenv.config()

const mongoURI = process.env.mongoURI || "mongodb+srv://fsklever:popova12345@cluster0.su82uvr.mongodb.net/?retryWrites=true&w=majority";


export const client = new MongoClient(mongoURI);
//const dbN = client.db
//export const blogsCollection = dbN.collection<blogsType>;
//export const postsCollection = dbN.collection<postsType>;

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

