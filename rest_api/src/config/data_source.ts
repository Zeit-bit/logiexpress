import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  Address,
  Client,
  Package,
  Shipment,
  ShipmentAudit,
  Storage,
  TrackingHistory,
} from '../entities/index.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3308,
  username: 'root',
  password: 'secret',
  database: 'logiexpress_db',
  entities: [Address, Client, Package, Shipment, ShipmentAudit, Storage, TrackingHistory],
  synchronize: false,
  logging: true,
});
