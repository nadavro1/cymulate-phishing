import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PhishingService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'jamir.frami@ethereal.email',
      pass: 'TPvkYatBYutMKTB1qR',
    },
  });

  async sendPhishingEmail(
    to: string,
    subject: string,
    body: string,
    trackingId: string,
  ) {
    const link = `http://localhost:3001/phishing/click/${trackingId}`;

    await this.transporter.sendMail({
      from: '"Security Team" <security@test.com>',
      to,
      subject,
      html: `
        <p>${body}</p>
        <a href="${link}">Verify your account</a>
      `,
    });
  }
}
