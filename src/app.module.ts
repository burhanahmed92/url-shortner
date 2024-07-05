import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { Url } from './url-shortener/entities/url.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Url],
      synchronize: true, // Note: Don't use synchronize in production, set up migrations instead
    }),
    UrlShortenerModule,
  ],
})
export class AppModule {}
