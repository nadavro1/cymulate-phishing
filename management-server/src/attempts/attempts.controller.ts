import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';

@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Get()
  getAll() {
    return this.attemptsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    const { email, subject, content } = body;
    return this.attemptsService.createAttempt(email, subject, content);
  }

  @Post(':trackingId/click')
  async markClicked(@Param('trackingId') trackingId: string) {
    await this.attemptsService.markClicked(trackingId);
    return { status: 'updated' };
  }
}
