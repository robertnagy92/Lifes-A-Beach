const { Schema, model } = require("mongoose");

// second collection of all the trip data
const tripSchema = new Schema({
  name: {
    type: String,
  },
  destination: {
    type: String,
  },

  budget: {
    type: Number,
  },

  approxDate: {
    type: Date,
  },

  lengthInWeeks: {
    type: Number,
  },

  luxury: {
    enum: ["Premium", "Basic", "Budget"],
  },

  car: {
    enum: ["SUV", "mid-size", "economy", "No car"],
  },

  food: {
    type: Number,
  },

  total: {
    type: Number,
    default: 0,
  },

  saveEach: {
    type: Number,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = model("trip", tripSchema);

module.exports = Trip;
