import { Schema, Document, Types } from 'mongoose';

export interface Course extends Document {
  title: string;
  description: string;
  topics: Types.ObjectId[]; // Definición del campo topics
}

export const CourseSchema = new Schema<Course>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }] // Definición de la referencia a Topic
  },
  { timestamps: true }
);
