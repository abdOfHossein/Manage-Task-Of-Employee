import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

export class BasicEnt extends BaseEntity {
  @CreateDateColumn({
    update: false,
  })
  create_at: Date;

  @UpdateDateColumn({})
  update_at: Date;

  @DeleteDateColumn({})
  delete_at?: Date;
}
