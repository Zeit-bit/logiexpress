import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Shipment } from './shipment.entity.js';
import { Storage } from './storage.entity.js';

@Entity('Package')
export class Package {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_package!: number;

  @Column({ type: 'int' })
  id_shipment!: number;

  @Column({ type: 'int' })
  id_storage!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight!: string;

  @Column({ type: 'varchar', length: 100 })
  dimensions!: string;

  @Column({ type: 'varchar', length: 255 })
  content!: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.packages, { nullable: false })
  @JoinColumn({ name: 'id_shipment' })
  shipment!: Relation<Shipment>;

  @ManyToOne(() => Storage, (storage) => storage.packages, { nullable: false })
  @JoinColumn({ name: 'id_storage' })
  storage!: Relation<Storage>;
}
