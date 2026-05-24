const User = require("../models/User");


// GET ALL FACULTY
const getFaculty = async (req, res) => {

  try {

    const facultyUsers = await User.find({
      role: "faculty",
    });

    res.status(200).json(facultyUsers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getFaculty,
};