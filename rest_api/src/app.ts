import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ message: 'API functioning correctly' });
});

export default app;
