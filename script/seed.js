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
    User.create({
      username: "grace",
      password: "123",
      email: "grace@gmail.com",
      isAdmin: true,
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Categories
  // const categories = await Promise.all([
  //   Category.create({ name: "mug" }),
  //   Category.create({ name: "plate" }),
  //   Category.create({ name: "bowl" }),
  //   Category.create({ name: "pot" }),
  //   Category.create({ name: "decorative" }),
  //   Category.create({ name: "planter" }),
  //   Category.create({ name: "set" }),
  //   Category.create({ name: "vase" }),
  // ]);

  const mug = await Category.create({ name: "mug" });
  const plate = await Category.create({ name: "plate" });
  const bowl = await Category.create({ name: "bowl" });
  const pot = await Category.create({ name: "pot" });
  const planter = await Category.create({ name: "planter" });
  const decorative = await Category.create({ name: "decorative" });
  const set = await Category.create({ name: "set" });
  const vase = await Category.create({ name: "vase" });

  const categories = [mug, plate, bowl, pot, planter, decorative, set, vase];

  console.log(`seeded ${categories.length} categories`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      title: "White Dinner Set",
      description: "A cute set for entertaining your friends on the weekend",
      price: 10.0,
      inventory: 100,
    }),
    Product.create({
      title: "Dog bowl",
      description: "Your pup will love drinking water from this bowl",
      price: 8.75,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/Saddle_Cereal_Bowl.jpg?v=1624636802",
      inventory: 500,
    }),
    Product.create({
      title: "Black Dinner Set",
      description: "Your meal will taste more delicious on this set!",
      price: 86.75,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/dearbornsite_1000x1500.jpg?v=1624636802",
      inventory: 40,
    }),
    Product.create({
      title: "Decorative vessel",
      description:
        "Don't put any food or plants in this, just look at it. And no touching.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/saffronsite_1000x1500.jpg?v=1624636802",
      price: 987.65,
      inventory: 1,
    }),
    Product.create({
      title: "Banorah",
      description:
        "Neither the banana nor the joke will ever get old. It’s basically a miracle.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/Banorahwebsite_1000x1500.jpg?v=1634343701",
      price: 88.88,
      inventory: 18,
    }),
    Product.create({
      title: "Hipster Dinner Set",
      description: "Impress all your hipster friends at your dinner party",
      imageUrl:
        "https://i.etsystatic.com/7825028/r/il/262f28/2097115019/il_794xN.2097115019_qy0c.jpg",
      price: 130.0,
      inventory: 180,
    }),
    Product.create({
      title: "Cow Cup",
      description: "For the cow lovers in your life.",
      imageUrl:
        "https://i.etsystatic.com/28826682/r/il/eefd67/3748224205/il_794xN.3748224205_3f6c.jpg",
      price: 30.0,
      inventory: 118,
    }),
    Product.create({
      title: "Mountain Ridges Planter",
      description: "Your plants will look dope in this planter.",
      imageUrl:
        "https://i.etsystatic.com/15492491/r/il/ab0c40/2192482518/il_794xN.2192482518_13cf.jpg",
      price: 35.0,
      inventory: 500,
    }),
    Product.create({
      title: "Pomegrante Vase",
      description:
        "Pomegranates symbolizes richness, fortune, fertility, beauty and eternal life in many cultures. I hope these colorful pomegranate vases bring joy to your living space.",
      imageUrl:
        "https://i.etsystatic.com/28924586/r/il/35ae44/3821704224/il_794xN.3821704224_gfpp.jpg",
      price: 32.0,
      inventory: 90,
    }),
    Product.create({
      title: "Elephant Vases",
      description:
        "These elephant flower vase with creative shape which will definitely add joy and happiness to your home and office.",
      imageUrl:
        "https://i.etsystatic.com/23727699/r/il/4198d6/3713986974/il_794xN.3713986974_cwqq.jpg",
      price: 50.0,
      inventory: 500,
    }),
    Product.create({
      title: "Fox mug",
      description:
        "Serve your tea or coffee in this cute autumn mug with a fox illustration.",
      imageUrl:
        "https://i.etsystatic.com/18262175/r/il/859a1f/2118562599/il_794xN.2118562599_ehyq.jpg",
      price: 17.0,
      inventory: 50,
    }),
    Product.create({
      title: "Pink mug",
      description: "This mug is as unique as you!",
      imageUrl:
        "https://i.etsystatic.com/26627763/r/il/dfaf4f/3524249252/il_794xN.3524249252_3jaa.jpg",
      price: 25.0,
      inventory: 60,
    }),
    Product.create({
      title: "Booty planter",
      description: "CHEEKY CONVERSATION STARTER",
      imageUrl:
        "https://i.etsystatic.com/18982670/r/il/5b6eb3/3741309865/il_794xN.3741309865_n7os.jpg",
      price: 20.0,
      inventory: 20,
    }),
    Product.create({
      title: "Kawaii Bear Cup",
      description:
        "Add a splash of color to your morning coffee or tea ritual!",
      imageUrl:
        "https://i.etsystatic.com/13375656/r/il/fbf2f4/3339756897/il_794xN.3339756897_8qrn.jpg",
      price: 16.0,
      inventory: 150,
    }),
    Product.create({
      title: "Chonky Cup",
      description: "Cute cup for coffee in the morning.",
      imageUrl:
        "https://i.etsystatic.com/29393639/r/il/8f8bf9/3209208262/il_794xN.3209208262_pstm.jpg",
      price: 29.0,
      inventory: 50,
    }),
    Product.create({
      title: "Cereal Bowl Set",
      description: "These bowls are handmade from iron red earthenware clay.",
      imageUrl:
        "https://i.etsystatic.com/7825028/r/il/d3e542/1476777373/il_794xN.1476777373_gvfq.jpg",
      price: 40.0,
      inventory: 510,
    }),
    Product.create({
      title: "Chicken Figurine",
      description: "So beautiful, your grandma will try to steal it.",
      imageUrl:
        "https://i.etsystatic.com/17403961/r/il/5cf5cd/3820063500/il_794xN.3820063500_k159.jpg",
      price: 90.0,
      inventory: 100,
    }),
    Product.create({
      title: "Decorative Koi",
      description: "Will bring you good luck.",
      imageUrl:
        "https://i.etsystatic.com/18525977/r/il/467943/3703152680/il_794xN.3703152680_j6nk.jpg",
      price: 26.0,
      inventory: 10,
    }),
    Product.create({
      title: "Terracotta Planter",
      description: "Perfect for your tomato plant",
      imageUrl:
        "https://i.etsystatic.com/24711735/r/il/ccb4cb/3860969071/il_794xN.3860969071_irgf.jpg",
      price: 6.0,
      inventory: 16,
    }),
    Product.create({
      title: "Blue Mug",
      description: "Looking at this will rmeind you of the ocean.",
      imageUrl:
        "https://i.etsystatic.com/14037439/r/il/a343a6/3801245529/il_794xN.3801245529_8jjj.jpg",
      price: 33.0,
      inventory: 18,
    }),
    Product.create({
      title: "Bunny Planter",
      description:
        "Can be used to grow small plants or flowers, also can be used as a pencil holder, can also be used for decoration.",
      imageUrl:
        "https://i.etsystatic.com/26059348/r/il/d8ab74/3174436091/il_794xN.3174436091_k97m.jpg",
      price: 38.0,
      inventory: 188,
    }),
    Product.create({
      title: "Minimalist Vase",
      description:
        "A decorative and functional vase, with a natural clay body and glazed interior. A beautiful addition to your home!",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5930254dd1758e61d78e7d65/1602335571526-CRZMZ3IQXJGTNGJR7UI9/0F125548-7E02-4A57-99BC-0C579BA78798.jpg?format=500w",
      price: 375.0,
      inventory: 5,
    }),
    Product.create({
      title: "Porcelain Vase",
      description:
        "A beautiful piece with a single brush stroke around the vase.  Use for a bouquet of flowers, a decorative piece in the house or a beautiful gift!",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5930254dd1758e61d78e7d65/1577496817699-0M8MX9XNVHY9XH41U3Y0/tom-kemp-porcelain-vase-8.jpg?format=500w",
      price: 425.0,
      inventory: 5,
    }),
    Product.create({
      title: "Sherbet Swirly Cups",
      description: "Bring some joy into your kitchen with these vibrant cups!",
      imageUrl:
        "https://i.pinimg.com/564x/b5/93/c8/b593c85fd644052a8030fa7e47bfb907.jpg",
      price: 35.0,
      inventory: 100,
    }),
    Product.create({
      title: "Abstract Cup",
      description:
        "Each cup is one of a kind abstract piece of art that you can also drink your coffee out of!",
      imageUrl:
        "https://media.architecturaldigest.com/photos/5cb5f678aff846364a559b1c/master/w_800%2Cc_limit/ceramicism-colorful-drip.jpg",
      price: 40,
      inventory: 100,
    }),
    Product.create({
      title: "Pink Marbled Mugs",
      description: "Pink and white marbled mugs.",
      imageUrl:
        "https://i.pinimg.com/564x/81/e2/14/81e214e91ed2b44a45b814142e793d35.jpg",
      price: 30,
      inventory: 45,
    }),
    Product.create({
      title: "Sunshine Pitcher Set",
      description:
        "Comes with a pitcher and two small tumbler cups with yellow accents.",
      imageUrl:
        "https://i.pinimg.com/564x/f2/b8/48/f2b8480e39f44f9897c2cd1b5949de52.jpg",
      price: 180,
      inventory: 25,
    }),
    Product.create({
      title: "Speckled Tumbler Cup Set",
      description:
        "Comes with two tumbler cups, white glaze with blue speckled accents",
      imageUrl:
        "https://i.pinimg.com/564x/25/63/86/256386e2328f833aa1feae0dac5557a9.jpg",
      price: 40,
      inventory: 30,
    }),
    Product.create({
      title: "Rainbow Speckled Cup",
      description:
        "A very bright and cute tumbler cup, each one is one of a kind!",
      imageUrl:
        "https://i.pinimg.com/564x/0a/d6/4d/0ad64d8e04531913b280159c88cc6bd2.jpg",
      price: 25,
      inventory: 30,
    }),
    Product.create({
      title: "Drippy Nebula Cups",
      description:
        "Defy gravity with these gorgeous tumbler cups, with unique colors on each one.",
      imageUrl:
        "https://i.pinimg.com/564x/0e/b6/14/0eb614799ad16f1f9be3c679341f464a.jpg",
      price: 25,
      inventory: 100,
    }),
    Product.create({
      title: "Colors Galore Cup",
      description:
        "One of a kind tumbler cups! Each one bright, vibrant, and will bring you joy to drink out of.",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/51ca200ee4b09eb6769f6307/1612977633627-SHPIWCL1WS04BOXCQK3B/IMG_3114.jpeg?format=1500w",
      price: 35,
      inventory: 100,
    }),
    Product.create({
      title: "Rustic Pink Plate Set",
      description:
        "Ideal for fruits, salad, or appetizers. Comes with one larger plate, and one smaller plate.",
      imageUrl:
        "https://www.susanarequena.com/wp-content/uploads/2020/03/handmade-ceramic-pink-plates-set.jpg",
      price: 125,
      inventory: 50,
    }),
    Product.create({
      title: "Rustic Woodfired Plate",
      description:
        "These are stunning unglazed, wood-fired plates.  Perfect for side dishes, sharing plates, or even just for decoration.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0696/9261/products/IMG_8481-2_1200x.jpg?v=1641147349",
      price: 35,
      inventory: 100,
    }),
    Product.create({
      title: "Mountain Tea Pot",
      description:
        "A minimal tea pot with a hand painted mountain of teal glaze.",
      imageUrl:
        "https://i.etsystatic.com/21044348/r/il/1c8467/3266991837/il_1588xN.3266991837_prv9.jpg",
      price: 100,
      inventory: 75,
    }),
    Product.create({
      title: "Blue Vessel Vase",
      description:
        "A bottleneck vessel with frosted light blue glaze, great for a decorative piece or a small bouquet. Each one is made to order and one-of-a-kind.",
      imageUrl:
        "https://assets.bigcartel.com/product_images/328134894/DSCF5243.JPG?auto=format&fit=max&w=1540",
      price: 170,
      inventory: 75,
    }),
    Product.create({
      title: "Pear Shaped Vase",
      description:
        "A blue pear shaped vase, one of a kind. Perfect for a small bouquet or adding accent to your home",
      imageUrl:
        "https://assets.bigcartel.com/product_images/319969734/DSCF4916.JPG?auto=format&fit=max&w=1540",
      price: 140,
      inventory: 65,
    }),
    Product.create({
      title: "Monkey Mug",
      description: "You’ll go ape for this mug",
      imageUrl:
        "https://www.centralcrafts.com/content/images/thumbs/0002552_monkey-8oz-black-handmade-coffee-mugs-02154-1.jpeg",
      price: 44.0,
      inventory: 230,
    }),
    Product.create({
      title: "Honey Pot",
      description: "Sweet enough for Winnie the Pooh",
      imageUrl:
        "https://assets.wsimgs.com/wsimgs/ab/images/dp/wcm/202211/0119/img33o.jpg",
      price: 52.13,
      inventory: 180,
    }),
    Product.create({
      title: "Artistic Mug",
      description:
        "Artsy and cool looking, but might leak., For display rather than drinking.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0481/8921/0787/products/16_postluster_LIGHT-site_1000x1500.jpg?v=1632776060",
      price: 29.95,
      inventory: 100,
    }),
    Product.create({
      title: "Dolly Parton Mug",
      description:
        "Handmade wheel-thrown mug with a glossy white glaze and the face of a legend",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1857/6179/products/rothshankDolly_1100x.jpg?v=1642013418",
      price: 55,
      inventory: 115,
    }),
    Product.create({
      title: "Earthy Dinner Set",
      description: "A simple and minimalist place setting.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0158/2248/products/RIP-Set-3piece-5_11411175-a858-496d-b39d-c05673b227f2_540x.jpg?v=1631539017",
      price: 114,
      inventory: 49,
    }),
    Product.create({
      title: "Sake Cup",
      description: "Stripped simple cup for sake or whisky. Happy sipping",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p1213_i2_w1000.jpeg?width=800",
      price: 29.99,
      inventory: 35,
    }),
    Product.create({
      title: "Modern Vase",
      description: "Modern and sleek vase. Handmade ceramic with satin glaze.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p16001_i1_w1000.jpeg?width=800",
      price: 200,
      inventory: 42,
    }),
    Product.create({
      title: "Candy Jar",
      description: "Handmade funky ceramic candy jar.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p3852_i2_w1000.jpeg?width=800",
      price: 90,
      inventory: 47,
    }),
    Product.create({
      title: "Colorful Container",
      description: "Handmade ceramic candy jar with bright colors.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p10086_i1_w2471.jpeg?width=800",
      price: 40,
      inventory: 187,
    }),
    Product.create({
      title: "Color Block Mug",
      description:
        "Handmade modern ceramic mug with cover to keep your drinks warm",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p16033_i1_w1000.jpeg?width=800",
      price: 70,
      inventory: 432,
    }),
    Product.create({
      title: "Fruit Bowl",
      description:
        "Artisanal stoneware shapes glazed in white. Will look gorgeous filled with apples, oranges, or lemons.",
      imageUrl:
        "https://cb.scene7.com/is/image/Crate/WelcomeWhiteBowlSSS20/$web_pdp_main_carousel_med$/200213121431/welcome-ii-bowl.jpg",
      price: 9.86,
      inventory: 2400,
    }),
    Product.create({
      title: "Modern Soup Bowl",
      description:
        "Modern handmade ceramic soup or serving bowl bowl with handle and orange glaze.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p16000_i1_w1000.jpeg?width=800",
      price: 70,
      inventory: 750,
    }),
    Product.create({
      title: "Pouring Pot",
      description:
        "Handmade ceramic teapot with crystalline glaze for serving tea.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p10745_i2_w2957.jpeg?width=2560?width=800",
      price: 150,
      inventory: 15,
    }),
    Product.create({
      title: "Glazed Serving Dish",
      description:
        "Beautiful handmade glazed ceramic platter. Wow your friends by serving dinner on this dish.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p14889_i1_w1000.jpeg?width=800",
      price: 68,
      inventory: 29,
    }),
    Product.create({
      title: "Modern Serving Vessel",
      description:
        "Sleek handmade ceramic serving bowl with handles and white satin glaze.",
      imageUrl:
        "https://www.nccshop.org/uploads/1/3/1/1/131168302/s106951362883517251_p16019_i1_w1000.jpeg?width=800",
      price: 150,
      inventory: 79,
    }),
  ]);

  // for (let i = 0; i < 14; i++) {
  //   let product = await Product.create({
  //     title: faker.random.word(),
  //     description: faker.lorem.sentence(),
  //     imageUrl: faker.image.image(800, 1000),
  //     price: Math.random(),
  //     inventory: Math.floor(Math.random() * 100),
  //   });
  //   products.push(product);
  // }

  // add random category to each product
  // products.forEach(async (product) => {
  //   const catId = Math.floor(Math.random() * categories.length + 1);
  //   await product.addCategory(catId);
  // });

  //adding category to each product
  products[0].addCategory(7);
  products[1].addCategory(3);
  products[2].addCategory(7);
  products[3].addCategory(6);
  products[4].addCategory(6);
  products[5].addCategory(7);
  products[6].addCategory(1);
  products[7].addCategory(5);
  products[8].addCategory(8);
  products[9].addCategory(8);
  products[10].addCategory(1);
  products[11].addCategory(1);
  products[12].addCategory(5);
  products[13].addCategory(1);
  products[14].addCategory(1);
  products[15].addCategory(7);
  products[16].addCategory(6);
  products[17].addCategory(6);
  products[18].addCategory(5);
  products[19].addCategory(1);
  products[20].addCategory(5);
  products[21].addCategory(8);
  products[22].addCategory(8);
  products[23].addCategory(1);
  products[24].addCategory(1);
  products[25].addCategory(1);
  products[26].addCategory(7);
  products[27].addCategory(7);
  products[28].addCategory(1);
  products[29].addCategory(1);
  products[30].addCategory(1);
  products[31].addCategory(7);
  products[32].addCategory(2);
  products[33].addCategory(4);
  products[34].addCategory(8);
  products[35].addCategory(8);
  products[36].addCategory(1);
  products[37].addCategory(4);
  products[38].addCategory(1);
  products[39].addCategory(1);
  products[40].addCategory(7);
  products[41].addCategory(1);
  products[42].addCategory(8);
  products[43].addCategory(4);
  products[44].addCategory(4);
  products[45].addCategory(1);
  products[46].addCategory(3);
  products[47].addCategory(3);
  products[48].addCategory(4);
  products[49].addCategory(2);
  products[50].addCategory(3);

  console.log(`seeded ${products.length} products`);

  // add to order
  await users[0].addToCart(products[0]);
  await users[0].addToCart(products[0]);
  await users[0].addToCart(products[2]);
  await users[1].addToCart(products[1]);
  await users[1].addToCart(products[1]);
  await users[1].addToCart(products[1]);
  await users[1].addToCart(products[3]);

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
    Review.create({
      content: "Absolutely stunning. I love having this piece in my home!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content:
        "This is a wonderful gift. I got this as a birthday gift for my partner, and they are in love with this piece!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content:
        "Arrived on time, was fully intact and it was so exciting to unpack!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "I LOVE THIS!!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "You really cannot go wrong with anything in this shop!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "This product is too beautiful to live.",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "BEST PRODUCT EVER!!!!!!!!!!!!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content:
        "Arrived broken, had to return. I received a replacement which looks nice, but overpriced",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "I’ll never shop at another store again",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "everyone should buy this immediately",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "This product is so wack!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content:
        "This item is the WORST thing I've ever bought in my life & I bought tickets to fyre festival.",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "This is the ugliest thing I've seen in my life...",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "I really wanted to like this, but I couldn't.",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "TERRIBLE PRODUCT!!!!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "HORRIBLE PRODUCT!",
      userId: Math.floor(Math.random() * users.length + 1),
      productId: Math.floor(Math.random() * products.length + 1),
    }),
    Review.create({
      content: "I wasn't a fan of this item but my blind grandma loves it! :D",
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
