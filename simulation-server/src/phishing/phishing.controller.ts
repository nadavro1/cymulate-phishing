import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import axios from 'axios';

@Controller('phishing')
export class PhishingController {
  constructor(private phishingService: PhishingService) {}

  @Post('send')
  async send(@Body() body: any) {
    const { email, subject, content, trackingId } = body;

    await this.phishingService.sendPhishingEmail(
      email,
      subject,
      content,
      trackingId,
    );

    return { status: 'sent' };
  }

  @Get('click/:trackingId')
  async click(@Param('trackingId') trackingId: string) {
    // notify management server
    await axios.post(
      `http://localhost:3000/attempts/${trackingId}/click`,
    );

    return 'Thanks, your account is verified.';
  }
}
