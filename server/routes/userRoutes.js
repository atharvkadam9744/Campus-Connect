const express = require("express");

const {
  getFaculty,
} = require("../controllers/userController");

const router = express.Router();


// Get All Faculty
router.get("/faculty", getFaculty);


module.exports = router;