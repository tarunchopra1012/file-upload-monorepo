import * as dotenv from 'dotenv';

dotenv.config();
const database = {
  development: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'invoiceapp',
    entities: ['dist/**/*.model.js'],
    synchronize: false,
    uuidExtension: 'pgcrypto',
  },
  test: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: '12345678',
    database: process.env.DB_NAME,
    entities: ['src/**/*.model.ts'],
    synchronize: true,
    dropSchema: true,
    migrationsRun: false,
    migrations: ['src/database/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    keepConnectionAlive: true,
    uuidExtension: 'pgcrypto',
  },
};

const env = process.env.NODE_ENV || 'development'; // Default to development if undefined

const DatabaseConfig = () => ({
  ...database[env],
});

export default DatabaseConfig;
