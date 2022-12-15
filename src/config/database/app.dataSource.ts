import { DataSource } from 'typeorm';
console.log('process.env.DB_HOST', process.env.DB_HOST);
export const AppDataSource = new DataSource({
  name: 'connection_postgres',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'task',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '774936188',
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});
