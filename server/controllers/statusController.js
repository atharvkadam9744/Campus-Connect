const User = require("../models/User");


// UPDATE STATUS
const updateStatus = async (req, res) => {
  try {

    const { userId, status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    // Emit live update
    const io = req.app.get("io");

    io.emit("statusUpdated", updatedUser);

    res.status(200).json({
      message: "Status updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  updateStatus,
};