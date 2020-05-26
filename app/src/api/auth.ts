import { UserModel } from '@/model/models';
import { get, post } from '@/api/utils';
import config, { APIResponse } from '@/api/config';

export const superman = async (): Promise<APIResponse<UserModel>> => {
  const response = await get<APIResponse<UserModel>>(config.url.superman);
  return response.jsonData || config.empty;
};

export const signOut = async (): Promise<APIResponse<{ message: string }>> => {
  const response = await post<APIResponse<{ message: string }>>(config.url.signOut);
  return response.jsonData || config.empty;
}

export const authenticate = async (username: string, password: string): Promise<APIResponse<UserModel>> => {
  const response = await post<APIResponse<UserModel>>(config.url.authenticate, {
    username,
    password
  });
  return response.jsonData || config.empty;
};