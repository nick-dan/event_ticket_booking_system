const eventService = require('../services/event.service');

// Create Event
const createEvent = async (req,res) => {
    try{
        const event = await eventService.createEvent(req.body);
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event
        });

    } catch(error){
        next(error);
    }
};

// List Events with Pagination
const listEvent = async (req,res) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result  = await eventService.listEvent({ page, limit });
        res.status(200).json({
            success: true,
            message: 'Events fetched successfully',
            data: result
        })
    }
    catch(error){
        next(error);
    }

}

module.exports = { createEvent, listEvent };