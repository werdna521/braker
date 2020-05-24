import { generatePostID } from './generator';
import { PostSchema } from '../types/dbschema.types';

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString();
};

export const formatToPost = (username: string, title: string, content: string): PostSchema => {
  const time = formatDateTime(new Date());
  const id = generatePostID();
  const likes: string[] = [];
  return { id, username, title, time, content, likes };
};