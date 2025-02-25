import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceModel } from './invoice.model';
import { Repository } from 'typeorm';

export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
  ) {}

  findByCustomer(id: string): Promise<InvoiceModel[]> {
    return this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.customer = :id', { id })
      .getMany();
  }
}
