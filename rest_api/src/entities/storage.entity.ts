import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Package } from './package.entity.js';

@Entity('Storage')
export class Storage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_storage!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  location!: string;

  @Column({ type: 'int' })
  capacity!: number;

  @OneToMany(() => Package, (parcel) => parcel.storage)
  packages!: Relation<Package[]>;
}
