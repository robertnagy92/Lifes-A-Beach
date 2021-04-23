const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;

// second collection of all the trip data
const tripSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },

  budget: { type: Number, required: true },

  timeuntil: {
    type: Number,
    required: true,
  },

  length: {
    type: Number,
    required: true,
  },

  luxury: {
    type: String,
    required: true,
  },
});

const Trip = model("trip", tripSchema);

module.exports = Trip;
