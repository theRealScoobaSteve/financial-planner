import {
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  confirmed: boolean;

  @Column({
    default: null,
  })
  plaid_token: string;
}
