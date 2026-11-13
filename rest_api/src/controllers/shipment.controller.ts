import type { Request, Response } from 'express';
import { shipmentRepository } from '../repositories/shipment.repository.js';
import type { Shipment } from '../entities/shipment.entity.js';

export async function createShipment(req: Request, res: Response): Promise<void> {
  const shipment: Shipment = await shipmentRepository.create(req.body);
  res.status(201).json(shipment);
}

export async function updateShipmentCost(req: Request, res: Response): Promise<void> {
  const shipment: Shipment | null = await shipmentRepository.updateCost(
    Number(req.params.id),
    req.body.cost,
    req.body.user,
  );
  res.json(shipment);
}

export async function getShipments(_req: Request, res: Response): Promise<void> {
  const shipments: Shipment[] = await shipmentRepository.findAll();
  res.json(shipments);
}

export async function getClientShipments(req: Request, res: Response): Promise<void> {
  const shipments: Shipment[] = await shipmentRepository.findByClientId(Number(req.params.id));
  res.json(shipments);
}
