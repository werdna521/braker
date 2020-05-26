export type UserModel = {
  username: string;
  name: string;
};

export type PostModel = {
  id: string;
  username: string;
  title: string;
  time: string;
  content: string;
  likes: string[]
}