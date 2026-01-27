const request = require("supertest");
require("dotenv").config();

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

describe('open API Tests',()=>{
    it('should create a new User',async () =>{
        const uniqueUsername = `testuser${Date.now()}`;
        const uniqueEmail = `unique${Date.now()}@gmail.com`;

        const res = await request(BASE_URL)
            .post('api/user/register')
            .send({
                username : uniqueUsername,
                email : uniqueEmail,
                password : 'securepassword123'
            });
        
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('User added Sucessfully');
        expect(res.body.user.email).toBe(uniqueEmail);
    });
});