import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.model';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) {}

  async getAllCourses(): Promise<Course[]> {
    return await this.courseModel.find().populate('topics').exec();
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async createCourse(courseData: Course): Promise<Course> {
    const createdCourse = new this.courseModel(courseData);
    return await createdCourse.save();
  }

  async updateCourse(id: string, courseData: Course): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, courseData, { new: true }).exec();
    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return updatedCourse;
  }

  async deleteCourse(id: string): Promise<void> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException('Course not found');
    }
  }

}