//importing required modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//initializing express app
const app = express();

//importing routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const bookingRoutes = require('./routes/booking.routes');

//middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//defining routes
app.use('/api/auth',authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

//default route
app.get('/', (req,res) => {
    res.send('Welcome to the Event Ticket Booking System API');
})

//global error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const success = err.success === undefined ? false : err.success;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: { success, message} });   
})

//exporting app
module.exports = app;