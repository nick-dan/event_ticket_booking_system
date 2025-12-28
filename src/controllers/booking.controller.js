const bookingService = require('../services/booking.service');

// Book Ticket Controller
const bookTicket = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const { eventId } = req.body;

        if(eventId === undefined || eventId === null || eventId === '' || !eventId){
            return res.status(400).json({ success: false, message: 'Event ID is required to book a ticket' });
        }

        const result = await bookingService.bookTicket(userId, eventId);
        res.status(200).json({
            success: true,
            message: 'Ticket booked successfully',
            data: result
        });

    } catch (err) {
        if (err.message === 'SOLD_OUT') {
            return res.status(409).json({ success: false, message: 'Tickets are sold out for this event' });
        }
        next(err);
    }
}

// Get My Bookings Controller
const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if(userId === undefined || userId === null || userId === '' || !userId){
        return res.status(400).json({ success: false, message: 'User ID is required to fetch bookings' });
    }
    const bookings = await bookingService.getMyBookings(userId);
    res.status(200).json({ success: true, message: 'Bookings fetched successfully', data: bookings });
  } catch (error) {
    next(error);
  }
};

module.exports = {bookTicket, getMyBookings };