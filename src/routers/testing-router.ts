import { Request, Response, Router } from "express"
import { blogsRepository } from "../repositories/blogs_db__repository"
import { postsRepository } from "../repositories/posts_in_memory__repository"

export const testingRouter = Router()

  testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  await Promise.all([blogsRepository.deleteAllBlogs(),
    postsRepository.deleteAllPosts()]);
    res.status(204).send('All data is deleted')
})