import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { testingRouter } from './routes/testing-routes';
import { bAuthMiddleware } from './middlewares/authvalidation';
const app = express()

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(bAuthMiddleware)


const port = process.env.PORT || 3038


app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
