import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Order } from './order.entity';
import { Claim } from './claim.entity';

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
  seller_id: string;

  @Column({
    default: null,
  })
  auth_token: string;

  @Column({
    default: false,
  })
  is_admin: boolean;

  @ManyToOne(
    type => Claim,
    claim => claim.user,
  )
  claims: Claim[];

  @ManyToOne(
    type => Order,
    order => order.user,
  )
  orders: Order[];
}
