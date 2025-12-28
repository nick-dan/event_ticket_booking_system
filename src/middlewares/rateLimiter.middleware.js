const rateLimiter = require("express-rate-limit");

// Rate limiter for login attempts
const loginLimiter = rateLimiter({
    windowMs : 15* 60 * 1000, 
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        message: "Too many login attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false
});

// General API rate limiter
const apiLimiter = rateLimiter({
    windowMs : 15* 60 * 1000, 
    max: 100, // limit each IP to 10 requests per windowMs
    message: {
        message: "Too many attempts from this IP, please slow down and try again later"
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    loginLimiter,
    apiLimiter
}