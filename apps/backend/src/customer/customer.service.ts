import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';
import { CustomerModel } from '../database/core/customer.model';

export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel)
    private customerRepository: Repository<CustomerModel>,
  ) {}

  create(details: CustomerDTO): Promise<CustomerModel> {
    return this.customerRepository.save(details);
  }

  findAll(): Promise<CustomerModel[]> {
    return this.customerRepository.find();
  }

  findOne(id: string): Promise<CustomerModel> {
    return this.customerRepository.findOne({
      where: {
        id,
      },
    });
  }
}
