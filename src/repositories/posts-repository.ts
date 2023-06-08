import { Request, Router ,Response } from "express";
import { DB, postsType, db, postsRouter} from "../routes/posts-router";



export const postRepository = {
    findAllBlogs() {
        return db.posts
    },
    getPostById(id:string) {
        return db.posts.find(b => b.id === id)
        
    },
    //postPost() {

    //},
    createPost(title: string, shortDescription: string, content:string, blogId:string, blogName:string) {
        const newPost: postsType = {
            id: (+(new Date())).toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogName
          }
          db.posts.push(newPost)
              return newPost
        },
        updatePosts(title: string, shortDescription: string, content:string, blogId:string, blogName: string) {
            const isUpPost: postsType = {
              id: (+(new Date())).toString(),
                  title: title,
                  shortDescription: shortDescription,
                  content: content,
                  blogId: blogId,
                  blogName: blogName
            }
            db.posts.push(isUpPost)
                return isUpPost
          },
          deletePosts(id:string) {
            for (let i = 0 ; i < db.posts.length; i++) {
              if (db.posts[i].id === id) {
                db.posts.splice(i,1)
                return true
              }
            }
            return false
          }
    }

