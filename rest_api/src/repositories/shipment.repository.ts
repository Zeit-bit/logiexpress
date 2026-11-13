import { AppDataSource } from '../config/data_source.js';
import { Shipment } from '../entities/shipment.entity.js';

export type CreateShipmentInput = Pick<
  Shipment,
  'id_address' | 'id_client' | 'sender_name' | 'recipient_name' | 'cost'
>;

export class ShipmentRepository {
  private repository = AppDataSource.getRepository(Shipment);

  async create(data: CreateShipmentInput): Promise<Shipment> {
    const shipment = this.repository.create({
      id_address: data.id_address,
      id_client: data.id_client,
      sender_name: data.sender_name,
      recipient_name: data.recipient_name,
      cost: data.cost,
      state: 'REGISTERED',
    });

    return this.repository.save(shipment);
  }

  async updateCost(id_shipment: number, cost: string, user: string): Promise<Shipment | null> {
    return AppDataSource.transaction(async (manager) => {
      const repository = manager.getRepository(Shipment);
      await manager.query('SET @audit_user = ?', [user]);

      try {
        await repository.update({ id_shipment }, { cost });
        return await repository.findOneBy({ id_shipment });
      } finally {
        await manager.query('SET @audit_user = NULL');
      }
    });
  }

  async findAll(): Promise<Shipment[]> {
    return this.repository.find({
      relations: { client: true, packages: true },
      order: { id_shipment: 'ASC' },
    });
  }

  async findByClientId(id_client: number): Promise<Shipment[]> {
    return this.repository.find({
      where: { id_client },
      relations: { tracking_history: true },
      order: {
        id_shipment: 'ASC',
        tracking_history: { date: 'ASC', id_tracking_history: 'ASC' },
      },
    });
  }
}

export const shipmentRepository = new ShipmentRepository();
