import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entity/User';

dotenv.config();

export const DataBase = new DataSource({
  type: 'mysql',
  host: process.env.HOSTNAME,
  port: 3306,
  username: process.env.HOSTUSER,
  password: process.env.HOSTPASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
