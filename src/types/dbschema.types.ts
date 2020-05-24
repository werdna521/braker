export type UserSchema = {
  username: string,
  name: string,
  password: string,
  session: string
};

export type PostSchema = {
  id: string,
  username: string,
  title: string,
  time: string,
  content: string,
  likes: string[]
};

export type DBSchema = {
  users: UserSchema[],
  posts: PostSchema[]
};