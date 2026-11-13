USE logiexpress_db;
DELIMITER $$

CREATE TRIGGER tr_validate_storage_capacity BEFORE INSERT ON Package
FOR EACH ROW
BEGIN
 DECLARE storage_capacity INT;
 DECLARE package_count INT;

 SELECT capacity INTO storage_capacity
 FROM Storage WHERE id_storage = NEW.id_storage;

 SELECT COUNT(*) INTO package_count
 FROM Package WHERE id_storage = NEW.id_storage;

 IF package_count >= storage_capacity THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Storage capacity exceeded';
 END IF;
END$$

CREATE TRIGGER tr_shipment_audit AFTER UPDATE ON Shipment
FOR EACH ROW
BEGIN
 IF OLD.cost <> NEW.cost THEN
  INSERT INTO Shipment_Audit (id_shipment, previous_cost, new_cost, user)
  VALUES (NEW.id_shipment, OLD.cost, NEW.cost, @audit_user);
 END IF;
END$$

CREATE TRIGGER tr_link_shipment_state AFTER INSERT ON Tracking_History
FOR EACH ROW
BEGIN
 UPDATE Shipment SET state = NEW.state
 WHERE id_shipment = NEW.id_shipment;
END$$

DELIMITER ;
