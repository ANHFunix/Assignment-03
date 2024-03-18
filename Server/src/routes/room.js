const express = require("express");

const roomController = require("../controllers/room");

const router = express.Router();

router.get("/", roomController.getAll);
router.get("/:roomId", roomController.getById);

// Export router
module.exports = router;
