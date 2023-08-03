const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  id: { type: Number, required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
