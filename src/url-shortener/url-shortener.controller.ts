import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ShortenUrlDto, ShortUrlResponseDto } from './dto/shorten-url.dto';
import { UrlValidationPipe } from './validation/url-validation.pipe';

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
    @Body(new UrlValidationPipe()) shortenUrlDto: ShortenUrlDto,
  ): Promise<ShortUrlResponseDto> {
    try {
      const shortUrl = await this.urlShortenerService.shortenUrl(shortenUrlDto);
      return { shortUrl };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error occurred');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirection to the original URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  async redirectToUrl(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const originalUrl = await this.urlShortenerService.getOriginalUrl(id);
      if (originalUrl) {
        res.redirect(originalUrl);
      } else {
        throw new NotFoundException('URL not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Error while redirecting');
      }
    }
  }
}
