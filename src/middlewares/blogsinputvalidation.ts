import {body} from 'express-validator';

const websiteUrlForm = "^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$";


export const blogInputValidationMiddleware = [ //проверка имени
    body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Type of name must string")
    .trim()
    .isLength( {
        min : 1,
        max : 15,
    })
    .withMessage(
        "Name length incorrect"
        ),
    body ("description")                // проверка описания
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be string")
    .trim()
    .isLength( {
        min: 1,
        max: 100,
    }),
    body("websiteUrl")      //проверка URL
    .exists()
    .withMessage("URL is required")
    .isString()
    .withMessage("websiteUrl must be string ")
    .trim()
    .isLength({
        min:1,
        max: 100,
    })
    .withMessage("websiteURL incorrect")
    .matches(websiteUrlForm)
    .withMessage("website url incorrect"),

];

