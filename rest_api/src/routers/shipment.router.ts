import { Router } from 'express';
import {
  createShipment,
  updateShipmentCost,
  getShipments,
  getClientShipments,
} from '../controllers/shipment.controller.js';

const shipmentRouter = Router();

shipmentRouter.post('/shipments', createShipment);
shipmentRouter.put('/shipments/:id/cost', updateShipmentCost);
shipmentRouter.get('/shipments', getShipments);
shipmentRouter.get('/clients/:id/shipments', getClientShipments);

export default shipmentRouter;
