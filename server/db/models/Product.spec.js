const {expect} = require('chai')
const {db, models:{Product}} = require ('../index');
const seed = require('../../../script/seed');

describe.only('Product model', () => {

    beforeEach(() => db.sync({force:true}))
    
    describe.only('column definitions and validations', () => {
        it('has a "title", "description", "price", inventory"', async () => {
            const mug = await Product.create({
                title: "Pusheen",
                description: "Cute pusheen cup for hot drinks",
                price: 20.00,
                inventory: 50,
            })

            expect(mug.title).to.equal("Pusheen")
            expect (mug.description).to.equal("Cute pusheen cup for hot drinks")
            expect(mug.price).to.equal('20.00')
            expect(mug.inventory).to.equal(50)
        })
       it("'imageUrl' has a default value of an image", async () => {
           const mug = await Product.create({title: "Pusheen", description: "Cute Pusheen cup for hot drinks", inventory: 50})

           expect(mug.imageUrl).to.equal("https://cdn.shopify.com/s/files/1/0481/8921/0787/products/celadonforsite_1000x1500.jpg?v=1624636802")
       })
       it("'inventory' has a default value of 0", async () => {
            const mug = await Product.create({title: "Pusheen", description: "Cute Pusheen cup for hot drinks"})
            expect(mug.inventory).to.equal(0)
        })
        it('`title`and `description` are required', () => {
            const mug = Product.build()
            return mug.validate()
              .then(
                () => {
                  throw new Error('Validation should have failed!')
                },
                (err) => {
                  expect(err).to.be.an('error')
                }
              )
          })
    })
})