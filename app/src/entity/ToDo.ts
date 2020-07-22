import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

export enum ToDoStatus {
  NEW = "New",
  READ = "Read",
  COMPLETED = "Completed"
}

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  task: string;

  @Column("int")
  user_id: number;

  @Column({
    type: "enum",
    enum: ToDoStatus,
    default: ToDoStatus.NEW
  })
  status: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
