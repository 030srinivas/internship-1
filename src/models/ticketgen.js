const mongoose = require("mongoose");

const ticketschema = new mongoose.Schema({
  tic: {
    type: String,
    required: true,
  },
  naam: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  raise: {
    type:String,
    required: true, // Changed to required
  },
  doc: {
    type: Buffer,
    required: true, // Added required
  },
  date: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  disapproved: {
    type: Boolean,
    default: false,
  }


});

// Create collection
const Ticket = new mongoose.model("Ticket", ticketschema);

module.exports = Ticket;
