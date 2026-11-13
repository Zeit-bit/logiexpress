import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Shipment } from './shipment.entity.js';

@Entity('Shipment_Audit')
export class ShipmentAudit {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_shipment_audit!: number;

  @Column({ type: 'int' })
  id_shipment!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  previous_cost!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  new_cost!: string;

  @Column({ type: 'varchar', length: 288 })
  user!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @ManyToOne(() => Shipment, (shipment) => shipment.audits, { nullable: false })
  @JoinColumn({ name: 'id_shipment' })
  shipment!: Relation<Shipment>;
}
