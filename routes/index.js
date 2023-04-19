const express = require("express");
const router = express.Router();
const { db } = require("../utils/db");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json(1);
});

module.exports = router;
