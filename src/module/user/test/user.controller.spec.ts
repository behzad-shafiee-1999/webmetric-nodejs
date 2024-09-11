import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { mcokUserService } from './__mocks__/user.service';
import { userSub } from './subs/user.sub';
import { RedisService } from 'src/module/redis/redis.service';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,{provide:RedisService,useValue:jest.fn()},{provide:ConfigService,useValue:jest.fn()}],
    })
      .overrideProvider(UserService)
      .useValue(mcokUserService())
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findOne', () => {
    let task;
    beforeEach(async () => {
      task = await userController.findOne(userSub().id);
    });
    it('finOne method in taskService must called', async () => {
      expect(userService.findOne).toHaveBeenCalledWith(userSub().id);
    });
    it('output must be taskSub ', async () => {
      expect(task).toEqual(userSub());
    });
  });

});
