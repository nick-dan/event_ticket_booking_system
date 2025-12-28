#User management

#Database Creation
CREATE DATABASE event_ticket_booking;
USE event_ticket_booking;

#1.Creating users table
CREATE TABLE users(
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('USER','ADMIN') DEFAULT 'USER' NOT NULL,
create_at TIMESTAMP default current_timestamp NOT NULL,
updated_at TIMESTAMP NULL 
);


#2.Creating booking table
CREATE TABLE bookings (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  event_id VARCHAR(50),
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
