require("dotenv").config();

//importing app and http module
const app = require('./app');
const http = require('http');

//importing database connection modules
const { connectSql } = require('./config/mysql');
const connectMongo = require('./config/mongo');

//defining port
const PORT = process.env.PORT || 3002;

//starting server after establishing database connections
const startServer = async () => {
    try {
        await connectSql();
        await connectMongo();
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`server is listening in port ${PORT}`)
        })

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

//invoke startServer function
startServer();
