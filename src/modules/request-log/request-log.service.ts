import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestLog } from './request-log.model';

@Injectable()
export class RequestLogService {
  constructor(@InjectModel(RequestLog.name) private requestLogModel: Model<RequestLog>) {}

  async findAll(): Promise<RequestLog[]> {
    return this.requestLogModel.find().exec();
  }

  async findById(id: string): Promise<RequestLog | null> {
    return this.requestLogModel.findById(id).exec();
  }

  async create(requestLog: RequestLog): Promise<RequestLog> {
    const newRequestLog = new this.requestLogModel(requestLog);
    return newRequestLog.save();
  }

  async update(id: string, requestLog: RequestLog): Promise<RequestLog | null> {
    return this.requestLogModel.findByIdAndUpdate(id, requestLog, { new: true }).exec();
  }

  async delete(id: string): Promise<RequestLog | null> {
    return this.requestLogModel.findByIdAndDelete(id).exec();
  }
}