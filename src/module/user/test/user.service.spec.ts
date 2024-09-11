import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { RedisService } from 'src/module/redis/redis.service';
import { ConfigService } from '@nestjs/config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{provide:RedisService,useValue:jest.fn()},{provide:ConfigService,useValue:jest.fn()}],
    })
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
