import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import DatabaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModel } from './customer/customer.model';
import { InvoiceModel } from './invoice/invoice.model';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensures ConfigModule is available globally
      envFilePath: '.env', // Explicitly specify the .env file
    }),
    UploadModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')), // Ensure it's a number
        username: configService.get<string>('DB_USERNAME'),
        password: String(configService.get<string>('DB_PASSWORD')), // Ensure it's a string
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        logging: true,
        entities: [CustomerModel, InvoiceModel],
      }),
    }),
    CustomerModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
