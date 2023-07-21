import request from 'supertest'
import {app} from '../../src'
import { db } from '../../src/db/db'
import { body } from 'express-validator'
import { BlogsCreateModel } from '../../src/models/blogsModel'
import { authorizationValidation } from '../../src/middlewares/inputvalidationmiddleware'


beforeAll(async () => {
    await request(app)
    .delete('/all-data')
    .set("Authorization", "Basic YWRtaW46cXdlcnR5");
});

/*describe('/blogs',() => {
    beforeAll(async () => {
        authorizationValidation 
})*/

describe('/blogs', () => {
    it('should return 200 and blogs array', async () => {
       await  request(app)
        .get('/blogs')
        .expect(200, db.blogs )
    });

    const createdBlogs: any=null
    it('should return 404 for not existing blogs', async () => {
        await  request(app)
         .get('/blogs/66666')
         .expect(404)
     })

     it('should dont create blogs with not correct input data', async () => {
        const data : BlogsCreateModel = {id: '',
            name: '',
            description: '',
            websiteUrl: '' }
        
       const createdBlogs = await  request(app)
         .post('/blogs')
         .send(data)
         .set("Authorization", "Basic YWRtaW46cXdlcnR5")
         .expect(400)
     })

        })
// })
