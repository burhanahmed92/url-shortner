import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ShortenUrlDto, ShortUrlResponseDto } from './dto/shorten-url.dto';

@ApiTags('url')
@Controller('url')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('shorten')
  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: ShortenUrlDto })
  @ApiResponse({
    status: 201,
    description: 'The URL has been successfully shortened.',
    type: ShortUrlResponseDto,
  })
  shortenUrl(@Body() shortenUrlDto: ShortenUrlDto): ShortUrlResponseDto {
    const id = this.urlShortenerService.shortenUrl(shortenUrlDto.url);
    const shortUrl = `${process.env.BASE_URL}/${id}`;
    return { shortUrl };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirection to the original URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  redirectToUrl(@Param('id') id: string, @Res() res: Response): void {
    const originalUrl = this.urlShortenerService.getOriginalUrl(id);
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      throw new NotFoundException('URL not found');
    }
  }
}
