
const path = require("path");
// eslint-disable-next-line no-undef
const rootDir = path.resolve(process.cwd());
const Product = require("../models/product");
const paging = require("../utils/paging");
const { deleteFile } = require("../utils/file");

// POST - /api/products
exports.create = async (req, res, next) => {
  try {
    const reqData = req.body;
    const resData = {};

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Create imgs from files
    const imgs = req.files.map((file) => baseUrl + "/" + file.path.replaceAll("\\", "/"));

    // Create product
    await Product.create({ ...reqData, imgs });

    resData.message = "Create product successfully";
    return res.json(resData);

  } catch (error) {
    return next(error);
  }
};

// GET - /api/products
exports.getAll = async (req, res, next) => {
  try {
    const queries = req.query;
    let resData = {};

    const sort = String(queries.sort || "");
    const limit = Number(queries.limit || 1000);
    const page_number = Number(queries.page_number || 1);
    const page_size = Number(queries.page_size || 12);
    const search = queries.search;
    
    const findBody = {};
    if (queries.category) findBody.category = String(queries.category);

    let products = await Product.find(findBody).sort(sort).limit(limit);

    // Filter products by name with keywords
    if (search) {
      const keywords = search
        .toLowerCase()
        .split(" ")
        .filter((kw) => kw !== "");
      products = products.filter((prod) => keywords.every((kw) => prod.name.toLowerCase().includes(kw)));
    }
    const paged = paging(products, page_number, page_size);

    resData = { ...paged };
    return res.json(resData);
  } catch (error) {
    return next(error);
  }
};

// GET - /api/products/:productId
exports.getById = async (req, res, next) => {
  try {
    const resData = {};
    const id = req.params.productId;

    // Get product by productId
    const product = await Product.findById(id);

    resData.item = product;
    return res.json(resData);

  } catch (error) {
    return next(error);
  }
};

// PUT - /api/products/:productId
exports.updateById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const reqData = req.body;
    const resData = {};

    // Update product by productId
    await Product.findByIdAndUpdate(id, reqData);

    resData.message = "Update product successfully";
    return res.json(resData);

  } catch (error) {
    return next(error);
  }
};

// DELETE - /api/products/:productId
exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const resData = {};

    // Get base url
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Get product images url
    const product = await Product.findById(id);
    const imgs = product.imgs;

    // Delete product by productId
    await Product.findByIdAndDelete(id);

    // Delete images if it is in storage
    imgs.forEach((img) => {
      if (img.includes(baseUrl)) {
        const imgDir = img.replace(baseUrl, rootDir).replaceAll("/", "\\");
        deleteFile(imgDir);
      }
    });

    resData.message = "Delete product successfully";
    return res.json(resData);

  } catch (error) {
    return next(error);
  }
};
