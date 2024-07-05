import { Injectable } from '@nestjs/common';
import * as shortid from 'shortid';

@Injectable()
export class UrlShortenerService {
  private urlDatabase: { [key: string]: string } = {};

  shortenUrl(originalUrl: string): string {
    const id = shortid.generate();
    this.urlDatabase[id] = originalUrl;
    return id;
  }

  getOriginalUrl(id: string): string {
    return this.urlDatabase[id];
  }
}
