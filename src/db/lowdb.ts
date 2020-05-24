import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export type UserSchema = {
  username: string,
  name: string,
  password: string
};

type DBSchema = {
  users: UserSchema[]
};

const adapter = new FileSync<DBSchema>('db.json');
const db = low(adapter);

// initialize db
db.defaults({ users: [] })
  .write();

export default db;