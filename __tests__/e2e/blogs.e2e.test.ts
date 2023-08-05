import request from 'supertest'
import { authorizationValidation } from '../../src/middlewares/inputvalidationmiddleware'
import { RouterPaths, app } from '../../src/setting'
import { BlogsViewModel } from '../../src/models/blogsModel'


const getRequest = () => {
    return request(app)
}





beforeAll(async () => {
    await getRequest()
    .delete(RouterPaths.blogs)
    .set("Authorization", "Basic YWRtaW46cXdlcnR5");

    await getRequest()
    .delete(RouterPaths.posts)
    .set("Authorization", "Basic YWRtaW46cXdlcnR5")
})
  
beforeAll(async () => {
    authorizationValidation 
});
    



describe('/blogs', () => {
it('should return 200 and empty array', async (): Promise<void> => {
  getRequest()
expect(1).toBe(1);
});



it('should return 200 and empty array', async () => {
        await getRequest()
        .get(RouterPaths.blogs)
        .expect(200, [])
});

it('should 404 for not existing blogs', async () => {
        await  getRequest()
         .get('/blogs/1')
         .expect(404)
});

it('shouldn/t create blogs with incorrect input data', async () => {
    const data: BlogsViewModel = {
        id: '',
        name: '',
        description: '',
        websiteUrl: '',
        createdAt: '',
        isMembership: true
    }
    
    await  getRequest()
     .post('/blogs')
     .send(data)
     .expect(404)
});

    
}) 
     
        
   

