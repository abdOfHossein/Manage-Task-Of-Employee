import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'connection_postgres',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'task',
  username: 'postgres',
  password: '774936188',
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});
