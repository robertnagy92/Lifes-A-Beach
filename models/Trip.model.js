const { Schema } = require("mongoose");

// second collection of all the trip data
const tripSchema = new Schema({
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
    enum: ["deluxe", "basic", "budget"],
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = model("trip", tripSchema);

module.exports = Trip;