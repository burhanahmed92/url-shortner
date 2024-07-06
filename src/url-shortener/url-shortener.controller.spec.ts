import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Url } from './entities/url.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UrlShortenerController', () => {
  let controller: UrlShortenerController;
  let service: UrlShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortenerController],
      providers: [
        UrlShortenerService,
        {
          provide: getRepositoryToken(Url),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UrlShortenerController>(UrlShortenerController);
    service = module.get<UrlShortenerService>(UrlShortenerService);
  });

  describe('shortenUrl', () => {
    it('should shorten a valid URL', async () => {
      const originalUrl = 'https://example.com';
      const shortId = 'abc123';
      const expectedShortUrl = `http://localhost:3000/url/${shortId}`;

      // Mocking shortenUrl method of service to return the expected short URL
      jest.spyOn(service, 'shortenUrl').mockResolvedValue(expectedShortUrl);

      // Invoke the controller method
      const result = await controller.shortenUrl({ url: originalUrl });

      // Assert that the controller returns the expected short URL structure
      expect(result).toEqual({ shortUrl: expectedShortUrl });
    });

    it('should throw BadRequestException for an invalid URL', async () => {
      const invalidUrl = 'invalid-url';

      // Mocking shortenUrl method of service to throw BadRequestException
      jest
        .spyOn(service, 'shortenUrl')
        .mockRejectedValue(new BadRequestException('Invalid URL'));

      // Expecting the controller method to throw BadRequestException
      await expect(controller.shortenUrl({ url: invalidUrl })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle internal server errors', async () => {
      const originalUrl = 'https://example.com';

      // Mocking shortenUrl method of service to throw InternalServerErrorException
      jest
        .spyOn(service, 'shortenUrl')
        .mockRejectedValue(new InternalServerErrorException('Server error'));

      // Expecting the controller method to throw InternalServerErrorException
      await expect(controller.shortenUrl({ url: originalUrl })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
