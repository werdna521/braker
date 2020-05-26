import config, { APIResponse } from '@/api/config';
import { PostModel } from '@/model/models';
import { get, post } from '@/api/utils';

export const getAll = async (): Promise<APIResponse<PostModel[]>> => {
  const response = await get<APIResponse<PostModel[]>>(config.url.getAllPost);
  return response.jsonData || config.empty;
};

export const create = async (title: string, content: string): Promise<APIResponse<PostModel>> => {
  const response = await post<APIResponse<PostModel>>(config.url.createPost, {
    title,
    content
  });
  return response.jsonData || config.empty;
};