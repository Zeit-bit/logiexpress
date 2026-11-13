import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Client } from './client.entity.js';
import { Shipment } from './shipment.entity.js';

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_address!: number;

  @Column({ type: 'int' })
  id_client!: number;

  @Column({ type: 'varchar', length: 255 })
  origin_address!: string;

  @Column({ type: 'varchar', length: 255 })
  destiny_address!: string;

  @ManyToOne(() => Client, (client) => client.addresses, { nullable: false })
  @JoinColumn({ name: 'id_client' })
  client!: Relation<Client>;

  @OneToMany(() => Shipment, (shipment) => shipment.address)
  shipments!: Relation<Shipment[]>;
}
