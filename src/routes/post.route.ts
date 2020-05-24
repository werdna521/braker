import express from 'express';
import { createPost, getPosts } from '../controllers/post.controller';
import { cookieMan } from '../middleware/middlewares';

const route = express.Router();

route.get('/get-all', cookieMan, getPosts);
route.post('/create', cookieMan, createPost);

export default route;