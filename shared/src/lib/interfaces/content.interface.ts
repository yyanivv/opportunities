import { Document } from 'mongoose';
export interface Content {
  title: { type: string, required: true },
  content: { type: string, required: true },
}

export interface ContentDocument extends Content, Document {}
