const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: Number, default: 0 },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  /**
   * password saving with hash and salt
   */
  hash: String,
  salt: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
