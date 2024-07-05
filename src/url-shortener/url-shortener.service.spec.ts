import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './url-shortener.service';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;
  let urlRepository: Partial<Repository<Url>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UrlShortenerService>(UrlShortenerService);
    urlRepository = module.get<Partial<Repository<Url>>>(
      getRepositoryToken(Url),
    );
  });

  it('should shorten a valid URL', async () => {
    const originalUrl = 'https://example.com';
    const shortId = 'abc123';

    // Mocking create and save methods of repository
    (urlRepository.create as jest.Mock).mockReturnValue({
      id: 1,
      originalUrl,
      shortId,
    });
    (urlRepository.save as jest.Mock).mockResolvedValueOnce({
      id: 1,
      originalUrl,
      shortId,
    });

    const result = await service.shortenUrl({ url: originalUrl });

    // Check if the result is defined and not null or empty
    expect(result).toBeDefined();
    expect(result).toBeTruthy(); // Ensures it's not null, undefined, or empty string
  });
});
