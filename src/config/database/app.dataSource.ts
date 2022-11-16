import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  name: 'connection_postgres',
  type: 'postgres',
  host: '136.243.169.68',
  port: 5432,
  database: 'struct',
  username: 'postgres',
  password: 'In@FuZhZNA46uY1!',
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});
