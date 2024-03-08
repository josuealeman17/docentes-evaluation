import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './course.controller';
import { CoursesService } from './course.service';
import { CourseSchema } from './course.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}