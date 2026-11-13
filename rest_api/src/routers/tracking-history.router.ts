import { Router } from 'express';
import { createShipmentTracking } from '../controllers/tracking-history.controller.js';

const trackingHistoryRouter = Router();

trackingHistoryRouter.post('/shipments/:id/tracking', createShipmentTracking);

export default trackingHistoryRouter;
