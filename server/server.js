require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const connectDB = require("./database/config");
const productRoutes = require("./routes/product.routes");
const path = require("path");
const port = process.env.PORT;
const cors = require('@fastify/cors');

connectDB();

fastify.register(cors, {
  origin: '*',
});
fastify.register(require("fastify-multipart"));
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "productImages"),
  prefix: "/productImages/",
});
fastify.register(productRoutes, { prefix: "/product" });

fastify.listen({ port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(` Server is now listening on ${address}`);
});
