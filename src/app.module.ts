import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestLogSchema } from './modules/request-log/request-log.schema';
import { RequestLogService } from './modules/request-log/request-log.service';
import { CoursesModule } from './courses/course.module';
import { TopicsModule } from './topics/topic.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017'), 
    MongooseModule.forFeature([
      { name: 'RequestLog', schema: RequestLogSchema },
    ]),
    CoursesModule,
    TopicsModule,
    AuthModule,
  ],
  providers: [RequestLogService],
})
export class AppModule {}