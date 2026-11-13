CREATE DATABASE IF NOT EXISTS logiexpress_db;
USE logiexpress_db;
CREATE TABLE Client (
 id_client INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 state VARCHAR(10) NOT NULL,
 credit_limit DECIMAL(12,2) NOT NULL,
 CHECK (state IN ('ACTIVE','INACTIVE'))
);
CREATE TABLE Storage (
 id_storage INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL, location VARCHAR(255) NOT NULL, capacity INT NOT NULL
);
CREATE TABLE Address (
 id_address INT AUTO_INCREMENT PRIMARY KEY, id_client INT NOT NULL,
 origin_address VARCHAR(255) NOT NULL, destiny_address VARCHAR(255) NOT NULL,
 FOREIGN KEY (id_client) REFERENCES Client(id_client)
);
CREATE TABLE Shipment (
 id_shipment INT AUTO_INCREMENT PRIMARY KEY,
 id_address INT NOT NULL, id_client INT NOT NULL, sender_name VARCHAR(150) NOT NULL, recipient_name VARCHAR(150) NOT NULL,
 cost DECIMAL(12,2) NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 state VARCHAR(12) NOT NULL,
 CHECK (state IN ('REGISTERED','IN_TRANSIT','DELIVERED','CANCELLED')),
 FOREIGN KEY (id_client) REFERENCES Client(id_client),
 FOREIGN KEY (id_address) REFERENCES Address(id_address)
);
CREATE TABLE Package (
 id_package INT AUTO_INCREMENT PRIMARY KEY, id_shipment INT NOT NULL, id_storage INT NOT NULL,
 weight DECIMAL(10,2) NOT NULL, dimensions VARCHAR(100) NOT NULL, content VARCHAR(255) NOT NULL,
 FOREIGN KEY (id_shipment) REFERENCES Shipment(id_shipment),
 FOREIGN KEY (id_storage) REFERENCES Storage(id_storage)
);
CREATE TABLE Tracking_History (
 id_tracking_history INT AUTO_INCREMENT PRIMARY KEY, id_shipment INT NOT NULL,
 date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, location VARCHAR(255) NOT NULL,
 state VARCHAR(12) NOT NULL, comments VARCHAR(500) NOT NULL,
 CHECK (state IN ('REGISTERED','IN_TRANSIT','DELIVERED','CANCELLED')),
 FOREIGN KEY (id_shipment) REFERENCES Shipment(id_shipment)
);
CREATE TABLE Shipment_Audit (
 id_shipment_audit INT AUTO_INCREMENT PRIMARY KEY, id_shipment INT NOT NULL,
 previous_cost DECIMAL(12,2) NOT NULL, new_cost DECIMAL(12,2) NOT NULL,
 user VARCHAR(288) NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (id_shipment) REFERENCES Shipment(id_shipment)
);
