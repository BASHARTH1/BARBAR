import { Body, Controller, Get, Post } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly service: DonationsService) {}

  @Post()
  create(@Body() dto: CreateDonationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
