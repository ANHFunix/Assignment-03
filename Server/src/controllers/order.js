const Order = require("../models/order");
const Product = require("../models/product");
const paging = require("../utils/paging");

// POST - /api/orders
exports.create = async (req, res, next) => {
  try {

    const reqData = req.body;
    const resData = {};

    // Decrease quantity of products in order
    reqData.products.forEach(async (prod) => {
      const productId = prod.product._id;
      const qty = prod.qty;
      await Product.findByIdAndUpdate(productId, { $inc: { remaining: -qty } });
    });

    // Create product
    const created = await Order.create({ ...reqData });

    resData.message = "Create order successfully";
    resData.item = created;
    return res.json(resData);

  } catch (error) {
    return next(error);
  }
};

// GET - /api/orders
exports.getAll = async (req, res, next) => {
  try {
    const queries = req.query;
    let resData = {};
    const sort = String(queries.sort || "");
    const limit = Number(queries.limit || 1000);
    const page_number = Number(queries.page_number || 1);
    const page_size = Number(queries.page_size || 12);
    
    const findBody = {};
    if (queries.user) findBody.user = queries.user;

    const orders = await Order.find(findBody).populate("user").populate("products.product").sort(sort).limit(limit);
    const paged = paging(orders, page_number, page_size);
    resData = { ...paged };
    return res.json(resData);
  } catch (error) {
    return next(error);
  }
};

// GET - /api/orders/:orderId
exports.getById = async (req, res, next) => {
  try {
    const resData = {};
    const id = req.params.orderId;

    const order = await Order.findById(id).populate("user").populate("products.product");

    resData.item = order;
    return res.json(resData);
  } catch (error) {
    return next(error);
  }
};

// PUT - /api/orders/:orderId
exports.updateById = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const reqData = req.body;
    const resData = {};

    // Update order by orderId
    const updated = await Order.findByIdAndUpdate(id, reqData).populate("user").populate("products.product");

    resData.message = "Update order successfully";
    resData.item = updated;
    return res.json(resData);
  } catch (error) {
    return next(error);
  }
};

// DELETE - /api/orders/:orderId
exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const resData = {};

    // Delete order by orderId
    await Order.findByIdAndDelete(id);

    resData.message = "Delete order successfully";
    return res.json(resData);
  } catch (error) {
    return next(error);
  }
};
