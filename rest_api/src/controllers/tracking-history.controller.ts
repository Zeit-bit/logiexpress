import type { Request, Response } from 'express';
import { trackingHistoryRepository } from '../repositories/tracking-history.repository.js';
import type { TrackingHistory } from '../entities/tracking-history.entity.js';

export async function createShipmentTracking(req: Request, res: Response): Promise<void> {
  const history: TrackingHistory = await trackingHistoryRepository.create(Number(req.params.id), req.body);
  res.status(201).json(history);
}
