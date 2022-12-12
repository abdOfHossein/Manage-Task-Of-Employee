import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'connection_postgres',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});
