import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DataSource } from 'typeorm';
const defaultDatabaseOptions = {
  // logger: new DatabaseLogger(),
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  migrationsTableName: 'migrations',
};

export const OrmConfigModulePostgres = {
  useFactory: () => ({
    // ...defaultDatabaseOptions,
    name: 'connection_postgres',
    type: 'postgres',
    host: process.env.DB_HOST || '192.168.10.200',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || "task",
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'HmpCo_2022_',
    entities: ['dist/**/*.entity.js', '**/*.entity.js'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
