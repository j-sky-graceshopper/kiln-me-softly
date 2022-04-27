const { expect } = require("chai");
const {
  db,
  models: { Product, Category },
} = require("../index");
const seed = require("../../../script/seed");

describe("Product model", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("column definitions and validations", () => {
    it('has a "title", "description", "price", inventory"', async () => {
      const mug = await Product.create({
        title: "Pusheen",
        description: "Cute pusheen cup for hot drinks",
        price: 20.0,
        inventory: 50,
      });

      expect(mug.title).to.equal("Pusheen");
      expect(mug.description).to.equal("Cute pusheen cup for hot drinks");
      expect(mug.price).to.equal("20.00");
      expect(mug.inventory).to.equal(50);
    });
    it("'imageUrl' has a default value of an image", async () => {
      const mug = await Product.create({
        title: "Pusheen",
        description: "Cute Pusheen cup for hot drinks",
        inventory: 50,
      });

      expect(mug.imageUrl).to.equal(
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/celadonforsite_1000x1500.jpg?v=1624636802"
      );
    });
    it("'inventory' has a default value of 0", async () => {
      const mug = await Product.create({
        title: "Pusheen",
        description: "Cute Pusheen cup for hot drinks",
      });
      expect(mug.inventory).to.equal(0);
    });
    it("`title`and `description` are required", () => {
      const mug = Product.build();
      return mug.validate().then(
        () => {
          throw new Error("Validation should have failed!");
        },
        (err) => {
          expect(err).to.be.an("error");
        }
      );
    });
    it("doesn't allow empty strings for `title`and `description`", async () => {
      try {
        await Product.create({
          title: "",
          description: "",
          price: 20.0,
          inventory: 50,
        });
      } catch (error) {
        expect(error.errors[0].message).to.equal(
          "Validation notEmpty on title failed"
        );
        expect(error.errors[1].message).to.equal(
          "Validation notEmpty on description failed"
        );
      }
    });
    it("has 2 decimal points for price", async () => {
      const mug = await Product.create({
        title: "Pusheen",
        description: "Cute pusheen cup for hot drinks",
        price: 20,
        inventory: 50,
      });
      const cup = await Product.create({
        title: "Push",
        description: "Cute pusheen cup for hot drinks",
        price: 20.011,
        inventory: 50,
      });
      expect(mug.price).to.equal("20.00");
      expect(cup.price).to.equal("20.01");
    });
    it("price can't be string", async () => {
      try {
        await Product.create({
          title: "Push",
          description: "Cute pusheen cup for hot drinks",
          price: "blabla",
          inventory: 50,
        });
      } catch (error) {
        expect(error.name).to.equal("SequelizeDatabaseError");
      }
    });
    it("has a many-to-many relationship with category", async () => {
      const mug = await Product.create({
        title: "Pusheen",
        description: "Cute pusheen cup for hot drinks",
        price: 20.0,
        inventory: 50,
      });
      const cup = await Category.create({ name: "mug" });
      await mug.addCategory(cup.id);
      const categories = await mug.getCategories();
      expect(categories).to.be.an("array");
      expect(categories.length).to.equal(1);
      expect(categories[0].name).to.equal("mug");
    });
  });
});
