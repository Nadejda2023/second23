 import {body} from 'express-validator';
  import { postRepository } from '../repositories/posts-repository';

  export const postInputValidationMiddleware = [ //проверка title
    body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Type of name must string")
    .trim()
    .isLength( {
        min : 1,
        max : 30,
    })
    .withMessage(
        "Name length incorrect"
        ),
    body ("shortDescription")                // проверка short описания
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be string")
    .trim()
    .isLength( {
        min: 1,
        max: 100,
    }),
    body("content")      //нужна проверка content
    .exists()
    .withMessage("content is required")
    .isString()
    .withMessage("content must be string ")
    .trim()
    .isLength({
        min:1,
        max: 1000,
    })
    .withMessage("content incorrect")
];
export const postIdFoundMiddleware = body("blogId").custom( (value) => {
    const postArray = postRepository.findAllBlogs();
    const foundId = postArray.filter(
        ( postType,index: number) => value === postArray[index].id
    );
    return foundId.length > 0;
});
export const postBlogNameValidationMiddleware = [
    body("blogName")      
    .exists()
    .withMessage("blogName is required")
    .isString()
    .withMessage("blogName must be string ")
   

];