const { faker } = require("@faker-js/faker");

const {
  db,
  models: { User, Product, Review, Category },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", email: "cody@gmail.com" }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@gmail.com",
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Categories
  const categories = await Promise.all([
    Category.create({ name: "mug" }),
    Category.create({ name: "plate" }),
    Category.create({ name: "bowl" }),
    Category.create({ name: "pot" }),
    Category.create({ name: "decorative" }),
  ]);

  console.log(`seeded ${categories.length} categories`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      title: "Cat mug",
      description: "A cute mug for sipping coffee and tea on the weekend",
      price: 10.0,
      inventory: 100,
    }),
    Product.create({
      title: "Dog bowl",
      description: "Your pup will love drinking water from this bowl",
      price: 8.75,
      inventory: 500,
    }),
    Product.create({
      title: "Plant pot",
      description:
        "ficus, spider plant, or succulent, your plants will thrive in this pot",
      price: 86.75,
      inventory: 40,
    }),
    Product.create({
      title: "Decorative vessel",
      description:
        "Don't put any food or plants in this, just look at it. And no touching.",
      price: 86753.09,
      inventory: 1,
    }),
  ]);

  // add random category to each product
  products.forEach(async (product) => {
    const catId = Math.floor(Math.random() * categories.length + 1);
    await product.addCategory(catId);
  });

  console.log(`seeded ${products.length} products`);

  // Creating Reviews
  const reviews = await Promise.all([
    Review.create({
      content: "this is an awesome product",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "gorgeous, 5/5 stars, couldn't be better",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "I've never seen something more beautiful in my life",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "soooooooo nice",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "just perfect, highly recommended",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
  ]);

  console.log(`seeded ${reviews.length} reviews`);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
