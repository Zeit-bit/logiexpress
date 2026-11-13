USE logiexpress_db;
DROP PROCEDURE IF EXISTS sp_client_monthly_report;
DROP PROCEDURE IF EXISTS sp_get_shipment_route_sheet;
DELIMITER $$
CREATE PROCEDURE sp_client_monthly_report(IN p_id_client INT, IN p_month INT, IN p_year INT)
BEGIN
 SELECT COALESCE(SUM(s.cost),0.00) AS total_billing,
        COUNT(d.delivered_at) AS delivered_shipments,
        ROUND(AVG(TIMESTAMPDIFF(SECOND,s.date,d.delivered_at)/86400.0),4) AS avg_delivery_time
 FROM Shipment s
 LEFT JOIN (SELECT id_shipment,MIN(date) AS delivered_at FROM Tracking_History
            WHERE state='DELIVERED' GROUP BY id_shipment) d ON d.id_shipment=s.id_shipment
 WHERE s.id_client=p_id_client
   AND MONTH(s.date)=p_month AND YEAR(s.date)=p_year;
END$$
CREATE PROCEDURE sp_get_shipment_route_sheet(IN p_id_shipment INT)
BEGIN
 SELECT s.id_shipment,p.weight,p.dimensions,p.content,s.sender_name,s.recipient_name,
        t.date,t.location,t.state,t.comments
 FROM Shipment s LEFT JOIN Package p ON p.id_shipment=s.id_shipment
 LEFT JOIN Tracking_History t ON t.id_shipment=s.id_shipment
 WHERE s.id_shipment=p_id_shipment ORDER BY p.id_package,t.date,t.id_tracking_history;
END$$
DELIMITER ;