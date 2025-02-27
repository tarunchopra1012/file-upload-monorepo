import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  synchronize: false,
  entities: ['**/*.model.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
