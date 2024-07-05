import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({
    example: 'https://example.com',
    description: 'The URL to be shortened',
  })
  url: string;
}

export class ShortUrlResponseDto {
  @ApiProperty({
    example: 'http://localhost:3000/url/abc123',
    description: 'The shortened URL',
  })
  shortUrl: string;
}
