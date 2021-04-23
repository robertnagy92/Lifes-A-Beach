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
  budget: Number,
  timeuntil: Number,
  length: Number,
  luxury: String,
});

const Trip = model("trip", tipSchema);

module.exports = Trip;
