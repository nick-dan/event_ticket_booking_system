// Ticket Booking Routes
const express = require('express');
const router = express.Router();

// Booking Controller
const {authMiddleware} = require('../middlewares/auth.middleware');
const {bookTicket, getMyBookings} = require('../controllers/booking.controller');
const { apiLimiter } = require('../middlewares/rateLimiter.middleware');

// Ticket Booking Routes
router.post('/book', apiLimiter, authMiddleware,bookTicket);
router.get("/my_tickets", apiLimiter, authMiddleware, getMyBookings);

module.exports = router;