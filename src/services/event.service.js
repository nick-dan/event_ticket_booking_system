// Event Service
const Event = require("../models/mongo/event.model");

//  Create Event
const createEvent = async (data) => {
    return await Event.create({
        ...data,
        availableTickets: data.totalTickets
    });
}

// List Events with Pagination
const listEvent = async ({ page = 1, limit = 10 }) => {
    try {
        const skip = (page - 1) * limit;

        const events = await Event.find().sort({ date: 1 }).skip(skip).limit(limit);
        const total = await Event.countDocuments();

        return {
            total,
            page,
            limit,
            events
        }
    }
    catch (err){
        throw err;
    }
   
}

module.exports = { createEvent, listEvent };