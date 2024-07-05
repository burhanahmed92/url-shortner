import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async shortenUrl(originalUrl: string): Promise<string> {
    const id = shortid.generate();
    const shortUrl = `${process.env.BASE_URL}/${id}`;
    const url = this.urlRepository.create({
      originalUrl,
      shortenedUrl: shortUrl,
    });
    await this.urlRepository.save(url);
    return shortUrl;
  }

  async getOriginalUrl(id: string): Promise<string> {
    const url = await this.urlRepository.findOne({
      where: { shortenedUrl: `${process.env.BASE_URL}/${id}` },
    });
    return url ? url.originalUrl : null;
  }
}
