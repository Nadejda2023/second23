import { Request, Response, Router,  } from "express"
import { blogsRepository } from "../repositories/blogs_db__repository";
import { postsRepository} from "../repositories/posts_db__repository";
import { usersTwoRepository } from "../repositories/usersRepository";
import { commentQueryRepository } from "../repositories/commentQueryRepository";


export const testingRouter = Router()

testingRouter.delete('/all-data',
async (req: Request, res: Response) => {
    await blogsRepository.deleteAllBlogs()
    await postsRepository.deleteAllPosts()
    await usersTwoRepository.deleteAllUsers()
    await commentQueryRepository.deleteAllComment()
    
    res.status(204).send('All data is deleted')
})
/*export const testingRouter = Router()

  testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  await Promise.all([blogsRepository.deleteAllBlogs(),
    postsRepository.deleteAllPosts()]);
    res.status(204).send('All data is deleted')
})*/
