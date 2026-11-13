import { AppDataSource } from '../config/data_source.js';
import { Package } from '../entities/package.entity.js';

export type CreatePackageInput = Pick<
  Package,
  'id_shipment' | 'weight' | 'dimensions' | 'content'
>;

export class PackageRepository {
  private repository = AppDataSource.getRepository(Package);
  
  async create(id_storage: number, data: CreatePackageInput): Promise<Package> {
    const parcel = this.repository.create({
      id_storage,
      id_shipment: data.id_shipment,
      weight: data.weight,
      dimensions: data.dimensions,
      content: data.content,
    });

    return this.repository.save(parcel);
  }
}

export const packageRepository = new PackageRepository();
