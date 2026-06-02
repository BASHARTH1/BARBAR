import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    const item = this.service.findOne(slug);
    if (!item) throw new NotFoundException('News article not found');
    return item;
  }
}
