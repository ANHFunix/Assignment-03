const express = require("express");

const sessionController = require("../controllers/session");

const router = express.Router();

router.post("/", sessionController.create);
router.get("/", sessionController.get);
router.delete("/", sessionController.delete);

// Export router
module.exports = router;
