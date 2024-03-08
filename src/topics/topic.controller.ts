import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { TopicsService } from './topic.service';
import { Topic } from './topic.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  @UseGuards(AuthGuard) 
  async getAllTopics() {
    return await this.topicsService.getAllTopics();
  }

  @Get(':id')
  async getTopic(@Param('id') id: string) {
    return await this.topicsService.getTopic(id);
  }

  @Post()
  async createTopic(@Body() topicData: any) {
    return await this.topicsService.createTopic(topicData);
  }

  @Put(':id')
  async updateTopic(@Param('id') id: string, @Body() topicData: any) {
    return await this.topicsService.updateTopic(id, topicData);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') id: string) {
    await this.topicsService.deleteTopic(id);
    return { message: 'Topic deleted successfully' };
  }
}
