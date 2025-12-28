const { body, validationResult } = require('express-validator');

// Validation middleware for user registration
const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: {success: false ,message:"There is a validation error", errors: errors.array() }});
        }
        next();
    }
]

// Validation middleware for user login
const loginValidator = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: {success: false ,message:"There is a validation error", errors: errors.array() }});
        }
        next();
    }
];

module.exports = { registerValidator, loginValidator }