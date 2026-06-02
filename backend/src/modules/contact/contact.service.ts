import { Injectable, Logger } from '@nestjs/common';
import { ContactMessageDto } from './contact-message.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  send(dto: ContactMessageDto) {
    this.logger.log(`Contact message from ${dto.name} <${dto.email}>: ${dto.subject}`);
    return { success: true, receivedAt: new Date().toISOString() };
  }
}
