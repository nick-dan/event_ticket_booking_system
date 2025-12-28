const mongoose = require("mongoose");

// Define Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    totalTickets: Number,
    availableTickets: Number,
    metaData: Object
});

module.exports = mongoose.model("Event", eventSchema);