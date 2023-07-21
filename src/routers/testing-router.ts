import { Request, Response, Router } from "express"
import { blogsRepository } from "../repositories/blogs-db--repository"
import { postsRepository } from "../repositories/posts-in-memory--repository"

export const testingRouter = Router()

  testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  await Promise.all([blogsRepository.deleteAllBlogs(),
    postsRepository.deleteAllPosts()]);
    res.status(204).send('All data is deleted')
})