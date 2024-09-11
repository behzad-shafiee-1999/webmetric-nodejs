import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private redisService:RedisService
  ){}
 async findAll(user_id: string) {
    let user_info = {
      user_id,
      firstname: `behzad_${user_id}`,
      lastname: `shafiee_${user_id}`
    }
    //ذخیره داده در ردیس
    await this.redisService.set(user_id,user_info,"60000")
    //اگر داده در کچ هست همان را برمیگردانم
    return {user_info}
  }
}
