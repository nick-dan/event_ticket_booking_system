const mysql = require("mysql2/promise");

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost' ,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Nick@#123',
    database: process.env.DB_NAME || 'event_ticket_booking',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to test the database connection
const connectSql =  async () => {
    try{
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();

    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        process.exit(1);
    }
}


module.exports = {pool, connectSql};