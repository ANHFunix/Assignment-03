const express = require("express");
const productController = require("../controllers/product");
const upload = require("../middlewares/upload");
const { requireRole } = require("../middlewares/auth");
const router = express.Router();

router.get("/", productController.getAll);
router.post("/",upload.array("imgs"),requireRole("admin"),productController.create
);
router.get("/:productId", productController.getById);
router.put("/:productId", requireRole("admin"), productController.updateById);
router.delete("/:productId",requireRole("admin"),productController.deleteById
);

module.exports = router;
