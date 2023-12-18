import { Schema } from 'mongoose';

export const ContentSchema = new Schema({
  // Define your schema properties here
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Add other properties as needed
});
