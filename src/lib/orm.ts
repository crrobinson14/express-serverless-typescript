import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import * as Models from '../models';

const options = {
  dialect: 'mysql',
  models: Object.values(Models),
} as SequelizeOptions;

let db = null as Sequelize | null;

export const connectDb = async () => {
  if (db === null) {
    return db;
  }

  if (!process.env.DB_URI) {
    throw new Error('Unable to connect to database: missing environment variable DB_URI');
  }

  db = new Sequelize(process.env.DB_URI, options);
  await db.authenticate();

  return db;
};

export const closeDb = async () => {
  if (db !== null) {
    db.close().catch((e) => console.warn('Unable to close database connection', e));
    db = null;
  }
};
