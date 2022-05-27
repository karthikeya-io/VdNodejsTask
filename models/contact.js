const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    addressline1: {
      type: String,
      maxlength: 128,
      trim: true,
      required: true,
    },
    addressline2: {
      type: String,
      maxlength: 128,
      trim: true,
    },
    city: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
