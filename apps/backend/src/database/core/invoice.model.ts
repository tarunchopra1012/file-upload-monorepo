import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerModel } from './customer.model';

export enum Currency {
  USD = 'USD',
  GBP = 'GBP',
  EUR = ' EUR',
}

export enum PaymentStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
}

@ObjectType()
export class Item {
  @Field()
  description: string;

  @Field()
  rate: number;

  @Field()
  quantity: number;
}

@ObjectType()
@Entity('invoices')
export class InvoiceModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  invoiceNo: string;

  @Field()
  @Column('text')
  description: string;

  @Field((type) => CustomerModel)
  @ManyToOne((type) => CustomerModel, (customer) => customer.invoices)
  customer: CustomerModel;

  @Field()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;

  @Field()
  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Field()
  @Column()
  taxRate: number;

  @Field()
  @Column()
  issueDate: string;

  @Field()
  @Column()
  dueDate: string;

  @Field()
  @Column('text')
  note: string;

  @Field((type) => [Item])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Column()
  @Field()
  taxAmount: number;

  @Column()
  @Field()
  subTotal: number;

  @Column()
  @Field()
  total: string;

  @Column({
    default: 0,
  })
  @Field()
  amountPaid: number;

  @Column()
  @Field()
  outstandingBalance: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
