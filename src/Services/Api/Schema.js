import { schema as Schema } from 'normalizr';

export const user = new Schema.Entity('users');

export const schemaMap = {
  user,
  users: [user]
};
