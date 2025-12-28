// Authentication Routes
const express = require('express');
const router = express.Router();

// Authentication Controller
const authController = require( '../controllers/auth.controller');
const validateMiddleware  = require('../middlewares/validate.middleware');
const { loginLimiter } = require('../middlewares/rateLimiter.middleware');

// User Registration and Login Routes
router.post('/register',loginLimiter,validateMiddleware.registerValidator, authController.register);
router.post('/login',loginLimiter,validateMiddleware.loginValidator, authController.login);

module.exports = router;