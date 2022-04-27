// const { expect } = require("chai");
// const supertest = require('supertest');
// const sinon = require("sinon");
// const app = require('../app')
// const agent = supertest.agent(app);
// const seed = require('./test-seed')
// const {Product} = require('../db')

// describe('Routes', () => {
//     let dinnerSet, catBowl, blackPlate;

//     beforeEach(async () => {
//         [dinnerSet, catBowl, blackPlate] = await seed()
//     });

//     describe('/products', () => {
//         describe('GET /products', () => {
//             it('sends all products', () => {
//                 return agent
//                 .get('/api/products')
//                 .expect(200)
//                 .then((res) => {
//                     expect(res.body).to.be.an('array');
//                     expect(
//                         res.body.some((product) => product.title === dinnerSet.title)
//                     ).to.equal(true);
//                     expect(
//                         res.body.some((product) => product.title === catBowl.title)
//                     ).to.equal(true)
//                 })
//             })
//         })
//     })
