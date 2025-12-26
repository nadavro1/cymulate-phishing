import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';

@Module({
  controllers: [PhishingController],
  providers: [PhishingService]
})
export class PhishingModule {}
