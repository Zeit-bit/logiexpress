import { Router } from 'express';
import { createPackage } from '../controllers/package.controller.js';

const packageRouter = Router();

packageRouter.post('/storages/:id/packages', createPackage);

export default packageRouter;
