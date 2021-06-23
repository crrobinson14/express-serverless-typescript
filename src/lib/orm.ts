import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {User} from '../models';
import {log} from './log';

const options = {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  models: [User],
} as SequelizeOptions;

let db = null as Sequelize | null;

export const connectDb = async () => {
  if (db !== null) {
    return db;
  }

  if (!process.env.DB_URI) {
    throw new Error('Unable to connect to database: missing environment variable DB_URI');
  }

  db = new Sequelize(process.env.DB_URI, options);
  await db
    .authenticate()
    .then(() => log.info('Connected to database'))
    .catch((e) => log.error('Unable to connect to database', e));

  return db;
};

export const closeDb = async () => {
  if (db !== null) {
    db.close().catch((e) => console.warn('Unable to close database connection', e));
    db = null;
  }
};

export const connectMiddleware = async (_: any, _2: any, next: Function) => {
  await connectDb();
  next();
};
