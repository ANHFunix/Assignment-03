const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:userId", userController.getById);
router.put("/:userId", userController.updateById);
router.delete("/:userId", userController.deleteById);

// Export router
module.exports = router;
