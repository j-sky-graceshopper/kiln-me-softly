/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Product } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app');
const { agent } = require('supertest');

describe('Products routes', () => {
  beforeEach (async() => {
    await seed();
  })

  describe('/api/products', () => {

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(66);
    })
    it('GET /api/products/:productsId', async() => {
      const res = await request(app)
      .get('/api/products/')
      .expect(200)

      expect(res.body).to.be.an('array');
    })
    it ('POST /api/products', () => {
      it('creates a new product and sends back the new product', async () => {
        await agent
          .post ('/api/products')
          .send({
            title: "Pusheen",
            description: "Best mug ever",
            price: 20.00,
            inventory: 100
          })
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.equal("Pusheen")
            expect(res.body.description).to.be("Best mug ever")
          })
      })
      it('PUT /api/products/:productId', () => {
        it('updates an existing product', async () => {
          const pusheen = await Product.create({
            id: 5,
            title: "Pusheen",
            description: "Cute pusheen cup for hot drinks",
            price: 20.00,
            inventory: 50,
          })
          await agent 
            .put(`api/products/${pusheen}`)
            .send({
              title: "Pusheen Mug"
            })
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object')
              expect(res.body.title).to.equal('Pusheen Mug')
              expect(res.body.inventory).to.equal(50)
            })

        })
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
