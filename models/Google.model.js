const { Schema, model } = require("mongoose");

const googleSchema = new Schema({
  googleId: {
    type: String,
    require: true
  }, 
  displayName: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  // username: {
  //   type: String,
  //   unique: true,
  // },
  // password: {
  //   type: String
  // },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Google = model("google", googleSchema);

module.exports = Google;
