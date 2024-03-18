const express = require("express");
const orderController = require("../controllers/order");
const { requireRole } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireRole("admin", "manager", "customer"), orderController.getAll);
router.post("/", requireRole("admin", "manager", "customer"), orderController.create);
router.get("/:orderId", requireRole("admin", "manager", "customer"), orderController.getById);
router.put("/:orderId", requireRole("admin"), orderController.updateById);
router.delete("/:orderId", requireRole("admin"), orderController.deleteById);

module.exports = router;
