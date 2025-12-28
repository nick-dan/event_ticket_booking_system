// Event Routes
const express = require('express');
const router = express.Router();

// Event Controller
const { createEvent, listEvent } = require('../controllers/event.controller');
const { apiLimiter } = require('../middlewares/rateLimiter.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/authorize.middleware');

// Event Routes
router.post('/', apiLimiter, authMiddleware, authorizeRoles('ADMIN'), createEvent);
router.get('/', apiLimiter, authMiddleware, listEvent);

module.exports = router;