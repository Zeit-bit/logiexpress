import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Address } from './address.entity.js';
import { Client } from './client.entity.js';
import { Package } from './package.entity.js';
import { TrackingHistory } from './tracking-history.entity.js';
import { ShipmentAudit } from './shipment-audit.entity.js';
import type { ShipmentState } from './shipment-state.js';

@Entity('Shipment')
@Check(`state IN ('REGISTERED','IN_TRANSIT','DELIVERED','CANCELLED')`)
export class Shipment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_shipment!: number;

  @Column({ type: 'int' })
  id_address!: number;

  @Column({ type: 'int' })
  id_client!: number;

  @Column({ type: 'varchar', length: 150 })
  sender_name!: string;

  @Column({ type: 'varchar', length: 150 })
  recipient_name!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  cost!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'varchar', length: 12 })
  state!: ShipmentState;

  @ManyToOne(() => Client, (client) => client.shipments, { nullable: false })
  @JoinColumn({ name: 'id_client' })
  client!: Relation<Client>;

  @ManyToOne(() => Address, (address) => address.shipments, { nullable: false })
  @JoinColumn({ name: 'id_address' })
  address!: Relation<Address>;

  @OneToMany(() => Package, (parcel) => parcel.shipment)
  packages!: Relation<Package[]>;

  @OneToMany(() => TrackingHistory, (history) => history.shipment)
  tracking_history!: Relation<TrackingHistory[]>;

  @OneToMany(() => ShipmentAudit, (audit) => audit.shipment)
  audits!: Relation<ShipmentAudit[]>;
}
