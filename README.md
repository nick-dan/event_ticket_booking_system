Event Ticket Booking Management System:
_______________________________________

A backend application built with Node.js for managing events and ticket bookings with secure authentication and concurrency-safe booking logic.

Key Highlights:

1.JWT-based authentication & role-based access control
2.Event management using MongoDB
3.Ticket booking with availability check & race-condition handling
4.User booking history
5.Security protections against brute force, XSS, and SQL injection

Tech Stack:

Node.js, Express.js
MySQL (Users & Bookings – Raw SQL)
MongoDB (Events)
JWT, bcrypt, helmet, express-rate-limit

Architecture:

Layered architecture with controllers, services, middlewares, and database layers for scalability and maintainability.

How to Run

1.Clone the repo
2.Install dependencies: npm install
3.Configure .env (MySQL, MongoDB, JWT)
4.Run MySQL SQL dump
5.Start server: npm start

Why This Design?

MySQL ensures transactional consistency for bookings, while MongoDB provides flexibility for event data. Middleware-driven security and clean layering make the system scalable and easy to extend.

