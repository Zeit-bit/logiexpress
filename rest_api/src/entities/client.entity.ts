import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Address } from './address.entity.js';
import { Shipment } from './shipment.entity.js';

@Entity('Client')
@Check(`state IN ('ACTIVE','INACTIVE')`)
export class Client {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_client!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 10 })
  state!: 'ACTIVE' | 'INACTIVE';

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  credit_limit!: string;

  @OneToMany(() => Address, (address) => address.client)
  addresses!: Relation<Address[]>;

  @OneToMany(() => Shipment, (shipment) => shipment.client)
  shipments!: Relation<Shipment[]>;
}
