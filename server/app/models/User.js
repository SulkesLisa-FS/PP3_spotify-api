const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    tokenExpires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
