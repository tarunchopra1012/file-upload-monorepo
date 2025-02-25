import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './customer.model';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
})
export class CustomerModule {}
