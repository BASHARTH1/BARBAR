import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessageDto } from './contact-message.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  send(@Body() dto: ContactMessageDto) {
    return this.service.send(dto);
  }
}
