import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt } from './attempt.schema';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>,
  ) {}

  async createAttempt(email: string, subject: string, content: string) {
    const trackingId = uuidv4();

    const attempt = await this.attemptModel.create({
      email,
      subject,
      content,
      trackingId,
      status: 'SENT',
    });

    // call simulation-server
    await axios.post('http://localhost:3001/phishing/send', {
      email,
      subject,
      content,
      trackingId,
    });

    return attempt;
  }

  async findAll() {
    return this.attemptModel.find().sort({ createdAt: -1 });
  }

  async markClicked(trackingId: string) {
    return this.attemptModel.findOneAndUpdate(
      { trackingId },
      {
        status: 'CLICKED',
        clickedAt: new Date(),
      },
      { new: true },
    );
  }
}
