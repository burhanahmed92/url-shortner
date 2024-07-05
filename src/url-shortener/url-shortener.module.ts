import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';

@Module({
  providers: [UrlShortenerService],
  controllers: [UrlShortenerController],
})
export class UrlShortenerModule {}
