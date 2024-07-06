import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as shortid from 'shortid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { ShortenUrlDto } from './dto/shorten-url.dto';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async shortenUrl(shortenUrlDto: ShortenUrlDto): Promise<string> {
    try {
      const id = shortid.generate();
      const shortUrl = `${process.env.BASE_URL}/${id}`;
      const url = this.urlRepository.create({
        originalUrl: shortenUrlDto.url,
        shortenedUrl: shortUrl,
      });
      await this.urlRepository.save(url);
      return shortUrl;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while shortening URL' + error,
      );
    }
  }

  async getOriginalUrl(id: string): Promise<string> {
    try {
      const url = await this.urlRepository.findOne({
        where: { shortenedUrl: `${process.env.BASE_URL}/${id}` },
      });
      return url ? url.originalUrl : null;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while retrieving original URL',
      );
    }
  }
}
