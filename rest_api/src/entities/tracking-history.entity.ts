import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Shipment } from './shipment.entity.js';
import type { ShipmentState } from './shipment-state.js';

@Entity('Tracking_History')
@Check(`state IN ('REGISTERED','IN_TRANSIT','DELIVERED','CANCELLED')`)
export class TrackingHistory {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_tracking_history!: number;

  @Column({ type: 'int' })
  id_shipment!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'varchar', length: 255 })
  location!: string;

  @Column({ type: 'varchar', length: 12 })
  state!: ShipmentState;

  @Column({ type: 'varchar', length: 500 })
  comments!: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.tracking_history, { nullable: false })
  @JoinColumn({ name: 'id_shipment' })
  shipment!: Relation<Shipment>;
}
