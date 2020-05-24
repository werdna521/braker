import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DBSchema } from '../types/dbschema.types';

const adapter = new FileSync<DBSchema>('db.json');
const db = low(adapter);

// initialize db
db.defaults({ users: [], posts: [] })
  .write();

export default db;