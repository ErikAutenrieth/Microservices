import { Test, TestingModule } from '@nestjs/testing';
import { AnchorService } from './anchor.service';

describe('EngineService', () => {
  let service: AnchorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnchorService],
    }).compile();

    service = module.get<AnchorService>(AnchorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
