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
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
  ): Promise<ShortUrlResponseDto> {
    const shortUrl = await this.urlShortenerService.shortenUrl(
      shortenUrlDto.url,
    );
    return { shortUrl };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirection to the original URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  async redirectToUrl(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const originalUrl = await this.urlShortenerService.getOriginalUrl(id);
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      throw new NotFoundException('URL not found');
    }
  }
}
