const Product = require("../models/Product");

// Get All products with pagination
const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    const start = page * perPage;

    const products = await Product.find().skip(start).limit(perPage);

    res.send({
      items: products,
      total: totalCount,
      page,
      perPage,
      totalPages,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add a product
const addProduct = async (req, res) => {
  const { name, image, price, rating } = req.body;

  try {
    const products = await Product.find({});

    const product = new Product({
      id: Number(products[products.length - 1].id) + 1,
      name,
      image,
      price,
      rating,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ id: req.params.id });

    existingProduct.name = req.body.name;
    existingProduct.image = req.body.image;
    existingProduct.price = req.body.price;
    existingProduct.rating = req.body.rating;

    await existingProduct.save();

    if (!existingProduct) {
      return res.status(404).send("Product not found");
    }

    res.send(existingProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Remove a product
const removeProduct = async (req, res) => {
  try {
    const _id = await Product.find({ id: req.params.id });

    const product = await Product.findByIdAndDelete(_id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  removeProduct,
};
