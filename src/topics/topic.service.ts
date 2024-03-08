import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './topic.model';

@Injectable()
export class TopicsService {
  constructor(@InjectModel('Topic') private readonly topicModel: Model<Topic>) {}

  async getAllTopics(): Promise<Topic[]> {
    return await this.topicModel.find().exec();
  }

  async getTopic(id: string): Promise<Topic> {
    const topic = await this.topicModel.findById(id).exec();
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  async createTopic(topicData: Topic): Promise<Topic> {
    const createdTopic = new this.topicModel(topicData);
    return await createdTopic.save();
  }

  async updateTopic(id: string, topicData: Topic): Promise<Topic> {
    const updatedTopic = await this.topicModel.findByIdAndUpdate(id, topicData, { new: true }).exec();
    if (!updatedTopic) {
      throw new NotFoundException('Topic not found');
    }
    return updatedTopic;
  }

  async deleteTopic(id: string): Promise<void> {
    const deletedTopic = await this.topicModel.findByIdAndDelete(id).exec();
    if (!deletedTopic) {
      throw new NotFoundException('Topic not found');
    }
  }
}