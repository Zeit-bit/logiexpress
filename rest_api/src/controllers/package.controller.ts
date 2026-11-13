import type { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { packageRepository } from '../repositories/package.repository.js';
import type { Package } from '../entities/package.entity.js';

export async function createPackage(req: Request, res: Response): Promise<void> {
  try {
    const parcel: Package = await packageRepository.create(Number(req.params.id), req.body);
    res.status(201).json(parcel);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const driver = error.driverError as { sqlState?: string; sqlMessage?: string };
      if (driver.sqlState === '45000' && driver.sqlMessage === 'Storage capacity exceeded') {
        res.status(400).json({ message: driver.sqlMessage, sqlState: driver.sqlState });
        return;
      }
    }
    throw error;
  }
}
