const express = require("express");

const {
  updateStatus,
} = require("../controllers/statusController");

const router = express.Router();


// Update Faculty Status
router.put("/update", updateStatus);


module.exports = router;