const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
