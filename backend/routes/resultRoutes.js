const express = require("express");

const {
  getAllResults,
  getResultsByExam,
} = require("../controllers/resultController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getAllResults
);

router.get(
  "/exam/:examId",
  protect,
  adminOnly,
  getResultsByExam
);

module.exports = router;