const express = require("express");
const mailController = require("../controllers/mail");
const { requireRole } = require("../middlewares/auth");
const router = express.Router();

router.post("/send-order", requireRole("customer", "manager", "admin"), mailController.sendOrder);

module.exports = router;
