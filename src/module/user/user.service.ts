import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private redisService: RedisService
  ) { }
  async findAll(user_id: string) {
    let user_info: any = {
      user_id,
      firstname: `behzad_${user_id}`,
      lastname: `shafiee_${user_id}`
    }

    //اگر داده در کچ هست همان را برمیگردانم
    const result = await this.redisService.get(user_id)
    if (result)
      user_info = JSON.parse(result)
    else
      await this.redisService.set(user_id, JSON.stringify(user_info), 60)

    return { user_info }
  }
}
