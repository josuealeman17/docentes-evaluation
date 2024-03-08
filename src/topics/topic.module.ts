import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsController } from './topic.controller';
import { TopicsService } from './topic.service';
import { TopicSchema } from './topic.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }])],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}