import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RequestLog extends Document {
  @Prop({ required: true })
  method!: string;

  @Prop({ required: true })
  originalUrl!: string;

  @Prop({ required: true })
  statusCode!: number;

  @Prop({ required: true })
  contentLength!: number;

  @Prop({ required: true })
  elapsedTime!: number;

  @Prop({ required: true })
  userAgent!: string;

  @Prop({ required: true })
  ip!: string;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);