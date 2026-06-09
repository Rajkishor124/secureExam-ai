const express = require("express");

const {
  getProfile,
  adminDashboard,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.get(
  "/admin",
  protect,
  adminOnly,
  adminDashboard
);

module.exports = router;