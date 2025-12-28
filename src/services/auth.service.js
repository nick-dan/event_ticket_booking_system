// Authentication Service
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// MySQL Connection Pool
const { pool } = require('../config/mysql');

// User Registration
const register = async ({ name, email, password, role}) => {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
        throw  { status: 409, success:false,message: "Email Already Registered" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query('INSERT INTO USERS (name, email, password, role) VALUES (?,?,?,?)',[name, email,hashedPassword, role]);

    return { id: result.insertId , name, email, role}
};

// User Login
const login = async ( {email, password}) => {
    const [rows] = await pool.query('SELECt id,name,email,password,role FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        throw { status: 401, message: "Invalid Email or Password"};
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw { status:401 , success: false,message: "Invalid password"};

    const token = jwt.sign({userId: user.id, emailId: user.email, role: user.role}, process.env.JWT_SECRET,{ expiresIn : '1h' });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login }