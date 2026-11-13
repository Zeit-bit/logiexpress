import express, { Request, Response } from 'express';
import shipmentRouter from './routers/shipment.router.js';
import packageRouter from './routers/package.router.js';
import trackingHistoryRouter from './routers/tracking-history.router.js';
const app = express();

app.use(express.json());
app.use('/api', shipmentRouter);
app.use('/api', packageRouter);
app.use('/api', trackingHistoryRouter);

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ message: 'API functioning correctly' });
});

export default app;
