import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ShortenUrlDto } from '../dto/shorten-url.dto';

@Injectable()
export class UrlValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    const { url } = value;
    const validatedUrl = plainToClass(ShortenUrlDto, { url });
    const errors = await validate(validatedUrl);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid URL');
    }
    return value;
  }
}
