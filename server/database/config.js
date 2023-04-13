const fastify = require("fastify")();
const db = process.env.DB_URL;

const connectDB = async () => {
  try {
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      url: db,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

module.exports = connectDB;
