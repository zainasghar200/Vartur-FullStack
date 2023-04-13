const {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const upload = require("../middlewares/image.middleware");

const productRoutes = (fastify, options, done) => {
  fastify.post(
    "/add-product",
    { preHandler: upload.single("image") },
    addProduct
  );
  fastify.get("/get-product/:id", getProductById);
  fastify.get("/get-products", getProducts);
  fastify.put(
    "/update-product/:id",
    { preHandler: upload.single("image") },
    updateProduct
  );
  fastify.delete("/delete-product/:id", deleteProduct);
  done();
};

module.exports = productRoutes;
