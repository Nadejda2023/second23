import { body } from "express-validator";
import { blogRepository } from "../repositories/blogs-repository";


export const blogIdFoundMiddleware = body("blogId").custom( (value) => {
    const blogsArray = blogRepository.findAllBlogs();
    const foundId = blogsArray.filter(
        ( blogsType,index: number) => value === blogsArray[index].id
    );
    return foundId.length > 0;
});