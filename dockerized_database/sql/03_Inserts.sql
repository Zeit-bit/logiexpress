USE logiexpress_db;
START TRANSACTION;
INSERT INTO Storage (id_storage,name,location,capacity) VALUES
(1,'North Distribution Center','Monterrey',4),
(2,'Central Warehouse','Mexico City',3),
(3,'Southeast Logistics Hub','Merida',5),
(4,'West Distribution Center','Guadalajara',2);
INSERT INTO Client (id_client,name,state,credit_limit) VALUES
(1,'Carlos Ramirez','ACTIVE',15000),
(2,'Maria Gonzalez','ACTIVE',25000),
(3,'Juan Perez','INACTIVE',5000),
(4,'Ana Martinez','ACTIVE',10000),
(5,'Luis Hernandez','ACTIVE',30000);
INSERT INTO Address (id_address,id_client,origin_address,destiny_address) VALUES
(1,1,'Monterrey, Nuevo Leon','Mexico City, CDMX'),
(2,1,'Monterrey, Nuevo Leon','Guadalajara, Jalisco'),
(3,2,'Mexico City, CDMX','Merida, Yucatan'),
(4,2,'Mexico City, CDMX','Puebla, Puebla'),
(5,3,'Guadalajara, Jalisco','Monterrey, Nuevo Leon'),
(6,4,'Merida, Yucatan','Cancun, Quintana Roo'),
(7,5,'Guadalajara, Jalisco','Mexico City, CDMX'),
(8,5,'Guadalajara, Jalisco','Queretaro, Queretaro');
INSERT INTO Shipment (id_shipment,id_address,id_client,sender_name,recipient_name,cost,date,state) VALUES
(1,1,1,'Carlos Ramirez','Pedro Sanchez',300,'2026-10-01 09:00:00','REGISTERED'),
(2,2,1,'Carlos Ramirez','Laura Torres',600,'2026-10-05 11:30:00','REGISTERED'),
(3,3,2,'Maria Gonzalez','Roberto Diaz',200,'2026-10-10 08:15:00','REGISTERED'),
(4,4,2,'Maria Gonzalez','Sofia Lopez',800,'2026-10-15 14:00:00','REGISTERED'),
(5,5,3,'Juan Perez','Miguel Castro',250,'2026-10-18 10:45:00','REGISTERED'),
(6,6,4,'Ana Martinez','Daniela Ruiz',380,'2026-11-01 09:30:00','REGISTERED'),
(7,6,4,'Ana Martinez','Fernando Ortiz',150,'2026-11-05 12:00:00','REGISTERED'),
(8,6,4,'Ana Martinez','Gabriela Flores',550,'2026-11-08 15:20:00','REGISTERED'),
(9,7,5,'Luis Hernandez','Ricardo Mendoza',280,'2026-11-10 08:00:00','REGISTERED'),
(10,8,5,'Luis Hernandez','Valeria Morales',700,'2026-11-11 13:15:00','REGISTERED');
INSERT INTO Package (id_package,id_shipment,id_storage,weight,dimensions,content) VALUES
(1,1,1,2.5,'30x20x15 cm','Electronic accessories'),
(2,2,1,5,'40x30x25 cm','Computer equipment'),
(3,3,2,1.2,'20x15x10 cm','Documents'),
(4,4,2,8.5,'60x40x30 cm','Home appliances'),
(5,5,2,3,'35x25x20 cm','Books'),
(6,6,3,4.5,'40x30x20 cm','Clothing'),
(7,7,3,1,'15x15x10 cm','Mobile phone'),
(8,8,3,6.2,'50x35x25 cm','Kitchen supplies'),
(9,9,4,2.8,'30x25x15 cm','Office supplies'),
(10,10,4,7.5,'55x40x35 cm','Automotive parts'),
(11,1,1,0.75,'20x15x10 cm','Accessory cables'),
(12,6,3,2.00,'25x20x15 cm','Additional clothing');
SET @audit_user='Ana Martinez';
UPDATE Shipment SET cost=350 WHERE id_shipment=1;
SET @audit_user='Maria Gonzalez';
UPDATE Shipment SET cost=620 WHERE id_shipment=2;
SET @audit_user='Ana Martinez';
UPDATE Shipment SET cost=180 WHERE id_shipment=3;
SET @audit_user='Carlos Ramirez';
UPDATE Shipment SET cost=850 WHERE id_shipment=4;
SET @audit_user='Ana Martinez';
UPDATE Shipment SET cost=400 WHERE id_shipment=6;
SET @audit_user='Maria Gonzalez';
UPDATE Shipment SET cost=300 WHERE id_shipment=9;
SET @audit_user='Ana Martinez';
UPDATE Shipment SET cost=750 WHERE id_shipment=10;
SET @audit_user=NULL;
INSERT INTO Tracking_History (id_tracking_history,id_shipment,date,location,state,comments) VALUES
(1,1,'2026-10-01 09:00:00','Monterrey','REGISTERED','Shipment registered'),
(2,1,'2026-10-02 08:00:00','San Luis Potosi','IN_TRANSIT','Package in transit'),
(3,1,'2026-10-03 14:30:00','Mexico City','DELIVERED','Delivered to recipient'),
(4,2,'2026-10-05 11:30:00','Monterrey','REGISTERED','Shipment registered'),
(5,2,'2026-10-06 09:00:00','Saltillo','IN_TRANSIT','Package dispatched'),
(6,2,'2026-10-07 16:45:00','Guadalajara','DELIVERED','Delivered successfully'),
(7,3,'2026-10-10 08:15:00','Mexico City','REGISTERED','Shipment registered'),
(8,3,'2026-10-11 12:00:00','Puebla','IN_TRANSIT','Package moving'),
(9,3,'2026-10-13 10:20:00','Merida','DELIVERED','Recipient confirmed delivery'),
(10,4,'2026-10-15 14:00:00','Mexico City','REGISTERED','Shipment registered'),
(11,4,'2026-10-16 07:30:00','Puebla','IN_TRANSIT','Package at distribution center'),
(12,5,'2026-10-18 10:45:00','Guadalajara','REGISTERED','Shipment registered'),
(13,5,'2026-10-18 12:00:00','Guadalajara','CANCELLED','Shipment cancelled by operator'),
(14,6,'2026-11-01 09:30:00','Merida','REGISTERED','Shipment registered'),
(15,6,'2026-11-02 08:00:00','Valladolid','IN_TRANSIT','Package in transit'),
(16,6,'2026-11-03 13:45:00','Cancun','DELIVERED','Delivered to recipient'),
(17,7,'2026-11-05 12:00:00','Merida','REGISTERED','Shipment registered'),
(18,7,'2026-11-06 09:30:00','Valladolid','IN_TRANSIT','Package in transit'),
(19,8,'2026-11-08 15:20:00','Merida','REGISTERED','Shipment awaiting dispatch'),
(20,9,'2026-11-10 08:00:00','Guadalajara','REGISTERED','Shipment registered'),
(21,9,'2026-11-11 10:15:00','Leon','IN_TRANSIT','Package transferred to regional hub'),
(22,10,'2026-11-11 13:15:00','Guadalajara','REGISTERED','Shipment awaiting pickup');
COMMIT;

