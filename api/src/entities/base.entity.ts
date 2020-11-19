import {
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export class BaseEntity {
  @Column()
  created_at: Date;

  @Column({
    default: new Date(),
  })
  updated_at: Date;

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.created_at = new Date();
  }
}
