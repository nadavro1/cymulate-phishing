import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PhishingAttempt extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  subject: string;

  @Prop()
  content: string;

  @Prop({ required: true, unique: true })
  trackingId: string;

  @Prop({ default: 'SENT' })
  status: 'SENT' | 'CLICKED';

  @Prop()
  clickedAt?: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
