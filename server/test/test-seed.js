// const {
//   db,
//   models: { Product, User, Review, Category, Order, Item },
// } = require("../db");

// module.exports = async () => {
//   await db.sync({ force: true });

//   const [user1, user2] = await Promise.all([
//     User.create({
//       username: "joey",
//       password: "123",
//       email: "joey@gmail.com",
//     }),
//     User.create({
//       username: "cat",
//       password: "123",
//       email: "cat@gmail.com",
//       isAdmin: true,
//     }),
//   ]);

//   const [product1, product2, product3] = await Promise.all([
//     Product.create({
//       title: "Dinner Set",
//       description: "A cute set for entertaining your friends on the weekend",
//       price: 10.0,
//       inventory: 100,
//     }),
//     Product.create({
//       title: "cat bowl",
//       description: "Your pup will love drinking water from this bowl",
//       price: 8.75,
//       imageUrl:
//         "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/Saddle_Cereal_Bowl.jpg?v=1624636802",
//       inventory: 500,
//     }),
//     Product.create({
//       title: "Black Plate",
//       description: "Your meal will taste more delicious on this set!",
//       price: 86.75,
//       imageUrl:
//         "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/dearbornsite_1000x1500.jpg?v=1624636802",
//       inventory: 40,
//     }),
//   ]);

//   const [review1, review2] = await Promise.all([
//     Review.create({
//       content: "this is an awesome product",
//       userId: user1.id,
//       productId: product1.id,
//     }),
//     Review.create({
//       content: "gorgeous, 5/5 stars, couldn't be better",
//       userId: user2.id,
//       productId: product2.id,
//     }),
//   ]);

//   const [category1, category2] = await Promise.all([
//     await Category.create({ name: "cat1" }),
//     await Category.create({ name: "cat2" }),
//   ]);

//   product1.addCategory(1);
//   product2.addCategory(1);
//   product3.addCategory(2);

//   return [
//     user1,
//     user2,
//     product1,
//     product2,
//     product3,
//     review1,
//     review2,
//     category1,
//     category2,
//   ];
// };
