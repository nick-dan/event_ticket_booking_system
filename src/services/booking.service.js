// Ticket Booking Service
const Event = require('../models/mongo/event.model');

// MySQL Connection Pool
const { pool } = require('../config/mysql');

// Book Ticket for an Event
const bookTicket = async (userId, eventId) => {
    // Decrement available tickets atomically
    const event = await Event.findOneAndUpdate(
        { _id: eventId, availableTickets: { $gt: 0 } },
        { $inc: { availableTickets: -1 } },
        { new: true }
    );

    if (!event) {
        throw {
            message: 'SOLD_OUT'
        };
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        const sql = 'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)';
        await connection.execute(sql, [userId, eventId]);
        await connection.commit();

        return {
            eventName: event.title,
            date: event.date,
        }

    } catch (err) {
        await connection.rollback();
        await Event.findByIdAndUpdate(eventId, {
            $inc: { availableTickets: 1 }
        });
        throw err;
    } finally {
        connection.release();
    }
}

// Get My Bookings
const getMyBookings = async (userId) => {
    try{
    const sql = 'SELECT event_id, booked_at FROM bookings WHERE user_id = ?';

    const [rows] = await pool.execute(sql, [userId]);

    if (rows.length === 0) {
        return [];
    };

    const eventIds = rows.map(row => row.event_id);

    const events = await Event.find({ _id: { $in: eventIds } }).select('title date location');


    const eventMap = {};
    events.forEach(event => {
        eventMap[event._id] = event;
    });

    return rows.map(row => ({
        eventId: row.event_id,
        eventName: eventMap[row.event_id]?.title,
        date: eventMap[row.event_id]?.date,
        location: eventMap[row.event_id]?.location,
        bookedAt: row.booked_at
    }))
    } catch (error) {
        throw error;
    }

}

module.exports = { bookTicket, getMyBookings }