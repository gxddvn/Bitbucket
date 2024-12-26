import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1303',
  database: 'bitbucket',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
