import * as repository from '../db/repository';
import * as response from '../utils/response';
import { ControllerGetNoParams, PostControllerCreatePost } from '../types/controller.types';
import { validateRequired, validateUsername } from '../utils/validator';
import { formatToPost } from '../utils/formatter';

export const getPosts: ControllerGetNoParams = (req, res) => {
  const posts = repository.retrieveAllPosts();
  response.ok(res, posts);
};

export const createPost: PostControllerCreatePost = (req, res) => {
  const { title, content } = req.body;
  const { username } = req.cookies.user;

  if (!validateRequired({ username, title, content }, res)) return;
  if (!validateUsername(username, res)) return;

  const post = formatToPost(username, title, content);
  repository.storePost(post);
  response.ok(res, post);
};