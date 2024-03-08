import { Schema, Document, Types } from 'mongoose';

export interface Topic extends Document {
  courseId: Types.ObjectId;
  title: string;
  content: string;
}

export const TopicSchema = new Schema<Topic>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);