import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './create-donation.dto';

export interface DonationRecord extends CreateDonationDto {
  id: number;
  createdAt: string;
  status: 'pending' | 'completed';
}

@Injectable()
export class DonationsService {
  private readonly records: DonationRecord[] = [];
  private nextId = 1;

  create(dto: CreateDonationDto) {
    const record: DonationRecord = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    this.records.push(record);
    return {
      success: true,
      donation: record,
      checkoutUrl: `/donate/checkout/${record.id}`,
    };
  }

  findAll() {
    return this.records;
  }
}
