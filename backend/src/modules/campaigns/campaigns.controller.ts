import { Controller, Get } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.service.findFeatured();
  }
}
