const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const prisma = new PrismaClient();

const productCtrl = {
  //add product 
  addProduct: async (req, res) => {
    try {
      const name = req.body.name;
      const filename = req.file;
      const productImagePath = path.join("productImages", req.file.filename);
      const imageUrl = `${req.protocol}://${req.hostname}/${productImagePath}`;

      if (!name || !filename) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ msg: "Please fill all fields" });
      } else {
        await prisma.product.create({
          data: {
            name,
            picture: imageUrl,
          },
        });
        return res.status(200).send({ msg: "Product created successfully" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  },
  //get single product by its id
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: id },
      });
      if (product) {
        return res.status(StatusCodes.OK).send(product);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: "No product found against this id!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  },
  //get all products
  getProducts: async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      if (products.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: "No products found!" });
      } else {
        return res.status(StatusCodes.OK).send(products);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  },
  //update specific product by its id
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const name = req.body.name;
      const findProduct = await prisma.product.findUnique({
        where: { id: id },
      });
      if (req.file.filename === undefined) {
        await prisma.product.update({
          where: { id: id },
          data: {
            name: name,
            picture: findProduct.picture,
          },
        });
        return res
          .status(StatusCodes.OK)
          .send({ msg: "Product updated successfully!" });
      } else {
        const productImagePath = path.join("productImages", req.file.filename);
        const imageUrl = `${req.protocol}://${req.hostname}/${productImagePath}`;
        await prisma.product.update({
          where: { id: id },
          data: {
            name: name,
            picture: imageUrl,
          },
        });
        return res
          .status(StatusCodes.OK)
          .send({ msg: "Product updated successfully!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  },
  //delete product by its id
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.product.delete({
        where: { id: id },
      });
      return res
        .status(StatusCodes.OK)
        .send({ msg: "Product deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
